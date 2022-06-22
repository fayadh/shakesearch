package main

import (
	"fmt"

	"github.com/joho/godotenv"

	"log"
	"net/http"
	"os"

	"pulley.com/shakesearch/routes"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file. Falling back to passed ENV variables.")
	}

	fmt.Printf(`Starting server...` + "\n")

	fs := http.FileServer(http.Dir("./client/build"))
	http.Handle("/", fs)

	// Perform a general search
	http.HandleFunc("/search", routes.HandleSearch())

	// Get work
	http.HandleFunc("/work", routes.HandleWork())

	// Get all works
	http.HandleFunc("/works", routes.HandleWorks())

	// Get all work characters
	http.HandleFunc("/works/characters", routes.HandleWorkCharacters())

	// handle ports
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	// go
	fmt.Printf("Listening on port %s.", port)
	err = http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}

}
