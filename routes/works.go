package routes

import (
	"pulley.com/shakesearch/elastic"

	"net/http"
)

func HandleWorks() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		es := elastic.GetClient()

		results := elastic.GetWorks(es)

		Respond(w, results)
	}
}
