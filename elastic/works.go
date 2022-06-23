package elastic

import (
	"context"

	"log"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

// Get all works.
func GetWorks(es *elasticsearch.Client) []interface{} {
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

	HandleError(res)
	r := DecodeBody(res.Body)

	return r["hits"].(map[string]interface{})["hits"].([]interface{})
}
