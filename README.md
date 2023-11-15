# Ravelin Front-End Code Test
Build a simple interface to search for venues in London using the Foursquare API.

## User Story
A user visits a website with two text fields:

- Authentication Key (an API key for the Foursquare API)
- Venue Name

After entering an authentication key and venue name, the user is presented with a list of venues to choose from. Clicking on a venue in the list should display details about the venue, such as the venue's address or category.

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
To get access to the Foursquare API you need to create a developer account. Follow the steps in the [Foursquare docs](https://location.foursquare.com/developer/reference/places-api-overview) to:
- Sign up
- Create a new project
- Generate an API key

#### Authentication
To authenticate a request to the Foursquare API, the authenication key should be passed in the `Authorization` header. See the [authentication docs](https://location.foursquare.com/developer/reference/authentication).

#### Foursquare Nearby Places Endpoint
- [Foursquare docs](https://location.foursquare.com/developer/reference/places-nearby)
- https://api.foursquare.com/v3/places/nearby?ll=51.509223%2C-0.113492&query={venueName}
