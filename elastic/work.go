package elastic

import (
	"context"

	"log"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

// Get work.
func GetWork(es *elasticsearch.Client, workId string) map[string]interface{} {
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

	HandleError(res)
	r := DecodeBody(res.Body)

	return r["hits"].(map[string]interface{})["hits"].([]interface{})[0].(map[string]interface{})
}
