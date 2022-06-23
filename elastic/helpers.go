package elastic

import (
	"encoding/json"
	"io"
	"log"
	"os"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/elastic/go-elasticsearch/v8/esapi"
)

// Since Shakespeare is no longer producing works, these indexes have fixed entry counts.
var TotalWorks = 43
var TotalCharacters = 1265

func GetClient() *elasticsearch.Client {
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

func HandleError(res *esapi.Response) {
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
}

func DecodeBody(b io.ReadCloser) map[string]interface{} {
	var (
		r (map[string]interface{})
	)

	if err := json.NewDecoder(b).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	return r
}
