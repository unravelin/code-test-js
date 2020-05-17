class Restaurants {
  constructor() {
    this.entries = new Map();
    this.similarities = new Set();
    this.entrySubscriptions = [];
    this.similaritySubscriptions = [];
  }

  addEntry(restaurant) {
    if(!this.entries.has(restaurant.id)) {
      this.entries.set(restaurant.id, restaurant);
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
    this.similarities.add(similarity);
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

export default new Restaurants();
