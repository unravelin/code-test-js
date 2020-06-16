# Ravelin JavaScript Code Test
Build a d3 graph of similar restaurants in London using the Foursquare API. Feel free to use any library or framework of choice. Please include a README alongside your code test detailing how to run it.

## User Story
A user visits a website with three text fields:

- Foursquare API Client ID
- Foursquare API Client Secret
- Venue Name

After entering the API Client ID/Secret and venue name, the user is given a list of venues to choose from (as their seed node).

Once the venue is picked, a D3 graph with the seed node (representing the venue) will appear. This node will then have similar venues extend from it (each connected via a single edge - see diagram).

As time passes, for each node, a venue API call (`v2/venues/{venueId}/similar`) will be made and the graph will grow with similar venues the API returns. The graph will continue to grow until the user presses the spacebar.

![D3 Graph](https://raw.githubusercontent.com/unravelin/code-test-js/master/graph.png)

## Requirements
- App must work as described in the [User Story](#User Story)
- Showcase your CSS chops. Try and do some amount of original CSS styling.

## Nice to haves
- TypeScript Support
- Unit Tests

## Foursquare API Endpoints
- https://api.foursquare.com/v2/venues/search?near=London&query={venueName}&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&v=20200226
- https://api.foursquare.com/v2/venues/{venueId}/similar?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&v=20200226

## Obtaining Foursquare Credentials
To get access to the Foursquare API you need to create a developer account. Follow the steps in the [Foursquare docs](https://developer.foursquare.com/docs/api) to:
- Sign up
- Create an app (your app URL can be localhost)
- Obtain your Client ID and Client Secret

## Resources
- [d3 GitHub repo](https://github.com/d3/d3)
- [Foursquare docs](https://developer.foursquare.com/docs)
- [Force-Directed Graph example](https://observablehq.com/@d3/force-directed-graph)
- [Modifying a Force Layout example](https://observablehq.com/@pbogden/modifying-a-force-layout)
