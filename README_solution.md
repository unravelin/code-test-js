# Ravelin Front-End Code Test Solution

This is a simple interface to search for venues in London using the Foursquare API.

# To run the project locally:

1. Clone the repository 
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. On the browser, input your Foursquare API key and venue name to search for venues in London
5. Click on a venue to view details
6. To view cached data, search for a venue that has been queried within the last five minutes and inspect the console for the message "Using cached data".

## User Story   
A user visits a website with two text fields:
1. Authentication Key (an API key for the Foursquare API)
2. Venue Name

When the user enters an authentication key and venue name, the user is presented with a list of venues to choose from. Clicking on a venue in the list displays details about the venue, such as the venue's address, caterogy, and photos if available.

The list is cached for five minutes. When the user searches for a venue name that has been previously queried within the last five minutes, the page displays cached results rather than performing a new request to the Foursquare API. Cached data will trigger a console log message "Using cached data"

For test purposes, the Api key is entered in the key input field, however, in a real-world scenario, the API key should be stored on the server side or in a secure environment.

In this project, I used React/TypeScript to build the interface and Axios to make requests to the Foursquare API. I also used context API to manage the state of the application and allow users to enter the API key and venue name in one component and display the venue details in another component without needing to re-enter the API key.

# Styling
I used CSS to style the interface. I used flexbox to layout the components and styled the input fields, buttons, and list items. I also added media queries for responsiveness.




