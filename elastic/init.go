package elastic

import (
	"bytes"
	"context"
	"encoding/json"

	"log"
	"os"
	"strconv"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

var TotalWorks = 43
var TotalCharacters = 1265

func SetupElastic() *elasticsearch.Client {
	log.SetFlags(0)

	esAddress := os.Getenv("ES_URL")
	esUsername := os.Getenv("ES_USERNAME")
	esPassword := os.Getenv("ES_PASSWORD")

	cfg := elasticsearch.Config{
		Addresses: []string{
			esAddress,
		},
		Username: esUsername,
		Password: esPassword,
	}
	es, err := elasticsearch.NewClient(cfg)

	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
	}

	return es
}

func GetClusterInfo(es *elasticsearch.Client) {
	var (
		r map[string]interface{}
	)

	log.Println(elasticsearch.Version)
	log.Println(es.Info())

	res, err := es.Info()
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	// Check response status
	if res.IsError() {
		log.Fatalf("Error: %s", res.String())
	}
	// Deserialize the response into a map.
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	// Print client and server version numbers.
	log.Printf("Client: %s", elasticsearch.Version)
	log.Printf("Server: %s", r["version"].(map[string]interface{})["number"])
	log.Println(strings.Repeat("~", 37))
}

func PrettySearchResult(response map[string]interface{}) map[string]interface{} {
	hits := response["hits"].(map[string]interface{})

	return map[string]interface{}{
		"hits":  hits["hits"],
		"total": hits["total"].(map[string]interface{})["value"],
	}
}

type SearchArgs struct {
	Query  string
	WorkId string
	CharId string
	Act    int
	Scene  int
	Page   int
}

func makeWorksHeadersAndQuery(args SearchArgs) string {
	worksHeader := `{ "index": "works" }` + "\n"
	worksQuery := `{ "size": ` + strconv.Itoa(TotalWorks) + `, "query": { "match": { "WorkID": "` + args.Query + `"} } }` + "\n"

	return worksHeader + worksQuery
}

func makeCharactersHeadersAndQuery(args SearchArgs) string {
	charHeader := `{ "index": "characters" }` + "\n"
	charQuery := `{ "size": ` + strconv.Itoa(TotalCharacters) + `,  "query": { "match": { "CharName": "` + args.Query + `"} } }` + "\n"

	return charHeader + charQuery
}

func makeParagraphHeadersAndQuery(args SearchArgs) string {
	size := 10
	from := size * (args.Page - 1)

	paragraphsQuery := ""
	paragraphsHeader := `{ "index": "paragraphs" }` + "\n"

	pagination := `"from": ` + strconv.Itoa(from) + `, "size": ` + strconv.Itoa(size)

	var must []string
	var should []string

	// If work is specified, only search within a work.
	if args.WorkId != "" {
		must = append(must, `{ "match": { "WorkID": "`+args.WorkId+`"} }`)
	} else {
		should = append(should, `{ "match": { "WorkID": "`+args.Query+`"} }`)
	}

	// If character is specified, only search results for that character.
	if args.CharId != "" {
		must = append(must, `{ "match": { "CharID": "`+args.CharId+`"} }`)
	} else {
		should = append(should, `{ "match": { "CharID": "`+args.Query+`"} }`)
	}

	// If act is specified, only search within the act.
	if args.Act != 0 {
		must = append(must, `{ "match": { "Chapter": `+strconv.Itoa(args.Act)+` } }`)
	}

	// If scene is specified, only search within the scene.
	if args.Scene != 0 {
		must = append(must, `{ "match": { "Section": `+strconv.Itoa(args.Scene)+` } }`)
	}

	// Search for text results that match 80% of the given keywords.
	must = append(must, `{ "match": { "PlainText": { "query": "`+args.Query+`", "minimum_should_match": "80%" } } }`)

	mustQueries := strings.Join(must, ",")
	shouldQueries := strings.Join(should, ",")

	paragraphsQuery = `{ ` + pagination + `, "query": {  "bool": {  "should": [  ` + shouldQueries + ` ], "must": [ ` + mustQueries + ` ] }  }  }`

	return paragraphsHeader + paragraphsQuery
}

func makeMultiSearchQuery(args SearchArgs) string {
	works := makeWorksHeadersAndQuery(args)
	characters := makeCharactersHeadersAndQuery(args)
	paragraphs := makeParagraphHeadersAndQuery(args)

	s := ""
	if args.Page == 1 {
		s = works + characters
	}
	s += paragraphs

	return s + "\n"
}

// Search for the indexed documents
func Search(es *elasticsearch.Client, args SearchArgs) map[string]interface{} {
	var (
		r map[string]interface{}
	)

	query := makeMultiSearchQuery(args)

	res, err := es.Msearch(strings.NewReader(query),
		es.Msearch.WithContext(context.Background()),
		es.Msearch.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	responses := r["responses"].([]interface{})

	emptySlice := []int{}

	if args.Page == 1 {
		return map[string]interface{}{
			"works":      PrettySearchResult(responses[0].(map[string]interface{})),
			"characters": PrettySearchResult(responses[1].(map[string]interface{})),
			"paragraphs": PrettySearchResult(responses[2].(map[string]interface{})),
		}
	} else {
		return map[string]interface{}{
			"works":      emptySlice,
			"characters": emptySlice,
			"paragraphs": PrettySearchResult(responses[0].(map[string]interface{})),
		}
	}

}

func Analyze(es *elasticsearch.Client, text string) []string {
	var (
		r map[string]interface{}
	)

	// Build the request body.
	var buf bytes.Buffer
	query := map[string]interface{}{
		"tokenizer": "standard",
		"text":      text,
	}

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}

	// Perform the search request.
	res, err := es.Indices.Analyze(
		es.Indices.Analyze.WithContext(context.Background()),
		es.Indices.Analyze.WithIndex("paragraphs"),
		es.Indices.Analyze.WithBody(&buf),
		es.Indices.Analyze.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	tokens := []string{}

	// Print the ID and document source for each hit.
	for _, token := range r["tokens"].([]interface{}) {
		t := token.(map[string]interface{})["token"].(string)
		log.Printf(" * %s", t)
		tokens = append(tokens, t)
	}

	log.Println(tokens)

	return tokens
}

// Get all works.
func GetWorks(es *elasticsearch.Client) []interface{} {
	var (
		r map[string]interface{}
	)

	query := `{ "query" : { "match_all" : { } } }`

	res, err := es.Search(
		es.Search.WithContext(context.Background()),
		es.Search.WithIndex("works"),
		es.Search.WithBody(strings.NewReader(query)),
		es.Search.WithSize(TotalWorks),
		es.Search.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	return r["hits"].(map[string]interface{})["hits"].([]interface{})
}

// Get work.
func GetWork(es *elasticsearch.Client, workId string) map[string]interface{} {
	var (
		r map[string]interface{}
	)

	query := `{ "query" : { "match" : { "WorkID": "` + workId + `" } } }`

	res, err := es.Search(
		es.Search.WithContext(context.Background()),
		es.Search.WithIndex("works"),
		es.Search.WithBody(strings.NewReader(query)),
		es.Search.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	return r["hits"].(map[string]interface{})["hits"].([]interface{})[0].(map[string]interface{})
}

// Get all characters for a given work.
func GetWorkCharacters(es *elasticsearch.Client, workId string) []interface{} {
	var (
		r map[string]interface{}
	)

	// Works happens to be a comma delimited string.
	query := `{ "size": ` + strconv.Itoa(TotalCharacters) + `,  "query" : { "query_string" : { "query": "` + workId + `", "default_field": "Works" } } }`

	res, err := es.Search(
		es.Search.WithContext(context.Background()),
		es.Search.WithIndex("characters"),
		es.Search.WithBody(strings.NewReader(query)),
		es.Search.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	return r["hits"].(map[string]interface{})["hits"].([]interface{})
}
