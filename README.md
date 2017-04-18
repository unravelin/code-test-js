# Ravelin Javascript Code Test
Build a d3 graph of similar restaurants in London using the foursquare api. Feel free to use any lib/framework you deem as necessary. Please include a readme with your code test.

## User Story
A user visits a website with two text fields: 
- Foursqaure API Key
- Restaurant Name

After entering the api key and restaurant name, the user are given a list of restaurants to choose from (as their seed node). Once the restaurant is picked a d3 graph with a single node will appear. As time passes the graph will grow with restaurants the foursquare api returns as similar, starting with the seed node and continuing down the network. The graph will continue to grow until the user clicks the spacebar.

## Fourquare API Endpoints
- https://api.foursquare.com/v2/venues/search?near=London&query={venueName}&oauth_token=XXXXXXX&v=20161005
- https://api.foursquare.com/v2/venues/{venueId}/similar?oauth_token=XXXXXXX&v=20161005

## Resources
- https://github.com/d3/d3
- http://bl.ocks.org/mbostock/4062045
- https://developer.foursquare.com/docs/
- https://bl.ocks.org/mbostock/1095795


## Tips
To get an oauth token you can go to https://developer.foursquare.com/docs/explore#req=users/self , login and you will see the token in the grey box.
