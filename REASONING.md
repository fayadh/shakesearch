# Reasoning

# What would a user want with this?

# Effort Statistics

- Date repository was made:
- Date ES Cloud service was set up:
- Date completed:
- Elapsed days:

# Procedures:

- Minimized time required to organize the CompleteWorks by finding a free nosql dump of shakespeare's works.
- Denormalized some of the data in those tables to optimize for ElasticSearch's abilities. (circumnavigated the need for join queries)

# Tech

- Server: Go
- Front End: React
- Database: ElasticSearch.

# Difficulties

- First time using Go.
- First time setting up and using ES.

# How search works

# What could be improved / What I would do if I had more time.

- Build pages for each of the works so that users can click on paragraph results and be taken exactly to that location for improved contextualization.
- Implement GraphQL for better type control.
- Turn the filters into a drop down form with a "submit" button to minimize server calls.
