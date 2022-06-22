package routes

import (
	"bytes"
	"encoding/json"
	"strconv"

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

		workId, workIdOk := r.URL.Query()["workId"]
		if workIdOk {
			args.WorkId = workId[0]
		}

		charId, charIdOk := r.URL.Query()["charId"]
		if charIdOk {
			args.CharId = charId[0]
		}

		act, actOk := r.URL.Query()["act"]
		if actOk {
			a := act[0]
			act, err := strconv.Atoi(a)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("act should be a number"))
				return
			}
			args.Act = act
		}

		scene, sceneOk := r.URL.Query()["scene"]
		if sceneOk {
			s := scene[0]
			scene, err := strconv.Atoi(s)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("scene should be a number"))
				return
			}
			args.Scene = scene
		}

		page, pageOk := r.URL.Query()["page"]
		if pageOk {
			p := page[0]
			b, err := strconv.Atoi(p)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("page should be a number"))
				return
			}
			args.Page = b
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

func HandleWorks() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		es := elastic.SetupElastic()

		results := elastic.GetWorks(es)

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

func HandleWorkCharacters() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		workId, ok := r.URL.Query()["workId"]
		if !ok || len(workId[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing workId in URL params"))
			return
		}

		es := elastic.SetupElastic()
		results := elastic.GetWorkCharacters(es, workId[0])

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

func HandleWork() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		workId, ok := r.URL.Query()["workId"]
		if !ok || len(workId[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing workId in URL params"))
			return
		}

		es := elastic.SetupElastic()
		results := elastic.GetWork(es, workId[0])

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
