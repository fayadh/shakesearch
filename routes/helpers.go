package routes

import (
	"bytes"
	"encoding/json"

	"net/http"
)

func Respond(w http.ResponseWriter, results interface{}) {
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
