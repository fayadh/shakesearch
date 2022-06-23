package routes

import (
	"pulley.com/shakesearch/elastic"

	"net/http"
)

func HandleWorkCharacters() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		workId, ok := r.URL.Query()["workId"]
		if !ok || len(workId[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing workId in URL params"))
			return
		}

		es := elastic.GetClient()
		results := elastic.GetWorkCharacters(es, workId[0])

		Respond(w, results)
	}
}
