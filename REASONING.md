# Reasoning

## Assumed user needs

- Find works, characters, and paragraphs containing keywords provided in the search input. An 80% match will be performed against paragraphs, and all keywords will be used to match works and characters.
- Have search state be reflected in the URL so that results are easily shareable.
- Be able to paginate through results.

## Tech

- Server: Go
- Front End: React
- Database: ElasticSearch (hosted).

## Effort Statistics

- Date repository was made: June 16th
- Date ES Cloud service was set up: June 12th
- Date completed: June 23rd

## Process:

- Minimized time required to organize the CompleteWorks by finding a free nosql dump of shakespeare's works.
- Denormalized some of the data in those tables to optimize for ElasticSearch's abilities. (circumnavigated the need for join queries)
- Iteratively worked on setting up the Go server and figuring out how ElasticSearch queries work.
- Setup the front end in tandem.
- Debugged and submitted.

# Difficulties

- First time using Go.
- First time setting up and using ES.

# How search works

- Type anything in the search input.
- A lookup will be performed against known Shakespearean works, characters, and paragraph texts.
- Character and works results will be returned only on the first page, and will always include all results.
- If any paragraph filters are provided, paragraph results will be filtered according to the work, character, act and scene provided.
- Paragraph character, act, and scene filters only show if a work is selected.
- No partial word matches are supported, only complete.
- Pagination is provided to go through results.

# What could be improved / What I would do if I had more time.

- Build pages for each of the works so that users can click on paragraph results and be taken exactly to that location for improved contextualization.
- Implement GraphQL for better query and data management. I chose to avoid this step because I wanted to minimize implementation risk with the Go server, as this is the first time I'm building one out.
- Turn the paragraphs filters into a drop down form with a "submit" button to minimize server calls.
- Add a debouncer to the
- Cleanup type related errors and improve the UI.
- Make better use of the css theme palette.
- Add testing to Go routes and front end components.
