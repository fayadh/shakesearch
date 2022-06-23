package elastic

import (
	"context"
	"strconv"

	"log"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

func makeWorksHeadersAndQuery(args SearchArgs) string {
	worksHeader := `{ "index": "works" }` + "\n"
	worksQuery := `{ "size": ` + strconv.Itoa(TotalWorks) + `, "query": { "match": { "Title": "` + args.Query + `"} } }` + "\n"

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
		must = append(must, `{ "match": { "Section": `+strconv.Itoa(args.Act)+` } }`)
	}

	// If scene is specified, only search within the scene.
	if args.Scene != 0 {
		must = append(must, `{ "match": { "Chapter": `+strconv.Itoa(args.Scene)+` } }`)
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

func ToPrettySearchResult(response map[string]interface{}) map[string]interface{} {
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

// Search for the indexed documents
func Search(es *elasticsearch.Client, args SearchArgs) map[string]interface{} {

	query := makeMultiSearchQuery(args)

	res, err := es.Msearch(strings.NewReader(query),
		es.Msearch.WithContext(context.Background()),
		es.Msearch.WithPretty(),
	)

	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	HandleError(res)
	r := DecodeBody(res.Body)

	responses := r["responses"].([]interface{})

	emptySlice := []int{}

	if args.Page == 1 {
		return map[string]interface{}{
			"works":      ToPrettySearchResult(responses[0].(map[string]interface{})),
			"characters": ToPrettySearchResult(responses[1].(map[string]interface{})),
			"paragraphs": ToPrettySearchResult(responses[2].(map[string]interface{})),
		}
	} else {
		return map[string]interface{}{
			"works":      emptySlice,
			"characters": emptySlice,
			"paragraphs": ToPrettySearchResult(responses[0].(map[string]interface{})),
		}
	}
}
