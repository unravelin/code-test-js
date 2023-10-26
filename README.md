# Ravelin Front-End Code Test
Build a simple interface to search for restaurants in London using the Foursquare API.

## User Story
A user visits a website with three text fields:

- Foursquare API Client ID
- Foursquare API Client Secret
- Venue Name

After entering the API Client ID/Secret and venue name, the user is presented with a list of venues to choose from. Clicking on a venue in the list should display details about the venue, such as the venue's address or category.

The website should cache search results for five minutes. When the user searches for a venue name that has been previously queried within the last five minutes, the page should display cached results rather than performing a new request to the Foursquare API.

## Requirements
- App must work as described in the User Story.
- Showcase your CSS chops. Try and do some amount of original CSS styling.
- Include a README alongside your code test detailing how to run it.

This repo includes a basic scaffold using [vite](https://vitejs.dev/guide/) which you are welcome use as a starting point — just run `npm install` and then `npm run dev` to get started. However, if you'd prefer to use something else, feel free to use any library or framework of choice.

Follow the directions from the recruiter on how to submit the exercise. Please do not publish your code publicly on GitHub or any other site. :warning:

## Nice to haves
- TypeScript Support
- Unit Tests

## Resources

#### Obtaining Foursquare Credentials
To get access to the Foursquare API you need to create a developer account. Follow the steps in the [Foursquare docs](https://developer.foursquare.com/docs/api) to:
- Sign up
- Create an app (your app URL can be localhost)
- Obtain your Client ID and Client Secret

#### Foursquare Venue Search Endpoint
- [Foursquare docs](https://developer.foursquare.com/docs/places-api/)
- https://api.foursquare.com/v2/venues/search?near=London&query={venueName}&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&v=20200226
