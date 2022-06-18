package elastic

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"

	"github.com/elastic/go-elasticsearch/v8"

	"log"
	"strings"
)

func SetupElastic() *elasticsearch.Client {
	log.SetFlags(0)

	// https://shakesearch.es.us-central1.gcp.cloud.es.io
	// Cluster ID: 58532f2b3e2e48c2b77ee4a94a9f18d5

	cfg := elasticsearch.Config{
		Addresses: []string{
			"https://shakesearch.es.us-central1.gcp.cloud.es.io",
		},
		Username: "elastic",
		Password: "wcCf5kFx3qNz2tdDX6EnAIUe",
	}
	es, err := elasticsearch.NewClient(cfg)

	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
	}

	GetClusterInfo(es)

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

func prettyResult(response map[string]interface{}) map[string]interface{} {
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
	Act    string
	Scene  string
}

func singleLine(s string) string {
	return strings.Replace(s, "\n", `\n`, -1)
}

func makeMultiSearchQuery(args SearchArgs) string {
	worksHeader := `{ "index": "works" }` + "\n"
	worksQuery := `{ "query": {  "match": { "Title": "` + args.Query + `"} } }` + "\n"

	log.Printf("Printing works query..")
	s := fmt.Sprintf("%#v", worksQuery)
	log.Printf(s)

	esQuery := fmt.Sprintf(worksHeader + worksQuery + `
	{ "index": "characters" }
	{ "query": { "match": { "CharName": "` + args.Query + `"} } }
	{ "index": "paragraphs" }
	{ "query": { "bool": { "should": [{ "match": { "PlainText": "` + args.Query + `"} }, { "match": { "CharName": "` + args.Query + `"} }, { "match": { "WorkTitle": "` + args.Query + `"} }] } } }`)

	return esQuery + "\n"
}

// Search for the indexed documents
func Search(es *elasticsearch.Client, args SearchArgs) map[string]interface{} {
	var (
		r map[string]interface{}
	)

	query := makeMultiSearchQuery(args)

	log.Printf("Printing query..")
	s := fmt.Sprintf("%#v", query)
	log.Printf(s)

	res, err := es.Msearch(strings.NewReader(query),
		es.Msearch.WithContext(context.Background()),
		es.Msearch.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	log.Printf("Printing..")
	s = fmt.Sprintf("%#v", res)
	log.Printf(s)

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

	log.Printf("Printing..")
	s = fmt.Sprintf("%#v", r)
	log.Printf(s)

	responses := r["responses"].([]interface{})
	s = fmt.Sprintf("%#v", responses)
	log.Printf(s)

	return map[string]interface{}{
		"works":      prettyResult(responses[0].(map[string]interface{})),
		"characters": prettyResult(responses[1].(map[string]interface{})),
		"paragraphs": prettyResult(responses[2].(map[string]interface{})),
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

	log.Printf("Printing..")
	s := fmt.Sprintf("%#v", res)
	log.Printf(s)

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

	log.Printf("Printing..")
	s = fmt.Sprintf("%#v", r)
	log.Printf(s)

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
