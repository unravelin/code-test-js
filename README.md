# Ravelin Javascript Code Test
Build a d3 graph of similar restaurants in London using the Foursquare API. Feel free to use any lib/framework you deem as necessary. Please include a readme with your code test.

## User Story
A user visits a website with three text fields:
- Foursqaure API Client ID
- Foursqaure API Client Secret
- Restaurant Name

After entering the API ID/secret and restaurant name, the user is given a list of restaurants to choose from (as their seed node). Once the restaurant is picked a d3 graph with a single node will appear. As time passes the graph will grow with restaurants the Foursquare API returns as similar, starting with the seed node and continuing down the network. The graph will continue to grow until the user presses the spacebar.

## Fourquare API Endpoints
- https://api.foursquare.com/v2/venues/search?near=London&query={venueName}&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&v=20200226
- https://api.foursquare.com/v2/venues/{venueId}/similar?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&v=20200226

## Resources
- [d3 GitHub repo](https://github.com/d3/d3)
- [Foursquare docs](https://developer.foursquare.com/docs)
- [Force-Directed Graph example](https://observablehq.com/@d3/force-directed-graph)
- [Modifying a Force Layout example](https://observablehq.com/@pbogden/modifying-a-force-layout)

## Obtaining Foursquare Credentials
To get access to the Foursquare API you need to create a developer account. Follow the steps in the [Foursquare docs](https://developer.foursquare.com/docs/api) to:
- Sign up
- Create an app (your app URL can be localhost)
- Obtain your client ID and secret
