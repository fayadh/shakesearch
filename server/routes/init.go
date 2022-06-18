package routes

import (
	"bytes"
	"encoding/json"

	"pulley.com/shakesearch/elastic"

	"net/http"
)

func HandleSearch() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		query, ok := r.URL.Query()["q"]
		if !ok || len(query[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing search query in URL params"))
			return
		}

		args := elastic.SearchArgs{
			Query: query[0],
		}

		workId, workIdOk := r.URL.Query()["WorkID"]
		if workIdOk {
			args.WorkId = workId[0]
		}

		charId, charIdOk := r.URL.Query()["CharID"]
		if charIdOk {
			args.CharId = charId[0]
		}

		act, actOk := r.URL.Query()["Act"]
		if actOk {
			args.Act = act[0]
		}

		scene, sceneOk := r.URL.Query()["Scene"]
		if sceneOk {
			args.Scene = scene[0]
		}

		es := elastic.SetupElastic()

		results := elastic.Search(es, args)

		// respond
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		err := enc.Encode(results)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("encoding failure"))
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Write(buf.Bytes())
	}
}
