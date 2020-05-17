import { map as d3Map, set as d3Set } from 'd3';

class Restaurants {
  constructor() {
    this.entries = d3Map();
    this.similarities = d3Map();
    this.entrySubscriptions = [];
    this.similaritySubscriptions = [];
  }

  addEntry(restaurant) {
    if(!this.entries.has(restaurant.id)) {
      this.entries.set(restaurant.id, restaurant);
      this.onUpdateEntry(restaurant);
    }
  }

  setFoundEntry(restaurantId) {
    if(this.entries.has(restaurantId)) {
      const restaurant = this.entries.get(restaurantId);
      restaurant.foundSimilar = true;

      this.onUpdateEntry(restaurant);
    }
  }

  updateEntry(restaurant) {
    if(this.entries.has(restaurant.id)) {
      this.entries.set(restaurant.id, restaurant);
      this.onUpdateEntry(restaurant);
    }
  }

  addSimilarity(similarity) {
    this.similarities.set(`${similarity.source}-${similarity.target}`, similarity);
    this.onAddSubscription(similarity);
  }

  onUpdateEntry(restaurant) {
    this.entrySubscriptions.forEach((subscription) => {
      subscription.call(this, restaurant);
    });
  }

  onAddSubscription(similarity) {
    this.similaritySubscriptions.forEach((subscription) => {
      subscription.call(this, similarity);
    });
  }

  setRestaurantListener(callback) {
    this.entrySubscriptions.push(callback);
  }

  setSimilarityListener(callback) {
    this.similaritySubscriptions.push(callback);
  }
}

const restaurants = new Restaurants();
window.restaurants = restaurants;

export default restaurants;
