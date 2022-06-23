package elastic

import (
	"context"

	"log"
	"strconv"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

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

	HandleError(res, r)

	return r["hits"].(map[string]interface{})["hits"].([]interface{})
}
