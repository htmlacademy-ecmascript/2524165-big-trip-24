import { getTrips } from '../mock/trip.js';
import { getFilters } from '../mock/filter.js';

export default class TripModel {
  #trips = getTrips();

  get trips() {
    return this.#trips;
  }

  get filters() {
    return getFilters(this.#trips);
  }
}
