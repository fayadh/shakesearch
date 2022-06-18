package main

import (
	"fmt"

	"pulley.com/shakesearch/routes"

	"log"
	"net/http"
	"os"
)

func main() {
	fmt.Printf("Hey u.")

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	// Perform a general search
	http.HandleFunc("/search", routes.HandleSearch())

	// Get all works
	http.HandleFunc("/works", routes.HandleWorks())

	// Get all works
	http.HandleFunc("/works/characters", routes.HandleWorkCharacters())

	// handle ports
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	// go
	fmt.Printf("Listening on port %s...", port)
	err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}

}
