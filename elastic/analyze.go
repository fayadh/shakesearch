package elastic

import (
	"bytes"
	"context"
	"encoding/json"

	"log"

	"github.com/elastic/go-elasticsearch/v8"
)

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

	HandleError(res, r)

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
