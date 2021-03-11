# Ravelin JavaScript Code Test
Build a small app to search for restaurants in London using the Foursquare API. Feel free to use any library or framework of choice. Please include a README alongside your code test detailing how to run it.

## User Story
A user visits a website with three text fields:

- Foursquare API Client ID
- Foursquare API Client Secret
- Venue Name

After entering the API Client ID/Secret and venue name, the user is presented with a list of venues to choose from. Clicking on a venue in the list should display details about the venue, including the venue's address and category (Coffee Shop, Gastropub, etc).

## Requirements
- App must work as described in the User Story
- Showcase your CSS chops. Try and do some amount of original CSS styling.

## Nice to haves
- TypeScript Support
- Unit Tests

## Foursquare API Endpoint
- https://api.foursquare.com/v2/venues/search?near=London&query={venueName}&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&v=20200226

## Obtaining Foursquare Credentials
To get access to the Foursquare API you need to create a developer account. Follow the steps in the [Foursquare docs](https://developer.foursquare.com/docs/api) to:
- Sign up
- Create an app (your app URL can be localhost)
- Obtain your Client ID and Client Secret

## Resources
- [Foursquare docs](https://developer.foursquare.com/docs)
