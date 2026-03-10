# Ravelin Front-End Code Test

Build a simple interface to search for museums using the Photon API.

## User Story

A user visits a website with an input field.

After entering a search term, the user is presented with a list of museums to choose from. Clicking a museum in the list should select it and display the museum's full address.

The website should cache search results for five minutes. When the user enters a search term that was previously queried within the last five minutes, the page should display the cached results rather than performing a new request to the Photon API.

## Requirements

- App must work as described in the User Story.
- Showcase your CSS chops. Try and do some amount of original CSS styling.
- Include a README alongside your code test detailing how to run it.

This repo includes a basic scaffold using [vite](https://vitejs.dev/guide/) which you are welcome use as a starting point — just run `npm install` and then `npm run dev` to get started. However, if you'd prefer to use something else, feel free to use any library or framework of choice.

## Nice to haves

- TypeScript Support
- Unit Tests

## Submission

- Please do not add your name, username, email address, or any other identifiable information into your code or README. We anonymise submissions prior to code review.
- Do not use public source control (e.g. a public GitHub repository) or publish your solution online.
- Follow the directions from the recruiter on how to submit the exercise.

## Resources

[Photon](https://photon.komoot.io/) is a free, open source geocoder using OpenStreetMap data. You are welcome to use the demo server for your project as long as the number of requests stay in a reasonable limit.

- [Photon API docs](https://github.com/komoot/photon/blob/master/docs/api-v1.md)
- Example request: https://photon.komoot.io/api/?q=art&osm_tag=tourism:museum
