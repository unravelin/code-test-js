export const getSuggestedVenues = (clientId, clientSecret, query) => fetch(`https://api.foursquare.com/v2/venues/search?near=London&query=${query}&client_id=${clientId}&client_secret=${clientSecret}&v=20200226`)
export const getSimilarVenues = (clientId, clientSecret, venueId) => fetch(`https://api.foursquare.com/v2/venues/${venueId}/similar?client_id=${clientId}&client_secret=${clientSecret}&v=20200226`)

export default {
  getSuggestedVenues,
  getSimilarVenues,
}
