import { getEvents } from '../mock/trip.js';
import { getFilters } from '../mock/filter.js';

export default class TripModel {
  #events = getEvents();

  get events() {
    return this.#events;
  }

  get filters() {
    return getFilters(this.#events);
  }
}
