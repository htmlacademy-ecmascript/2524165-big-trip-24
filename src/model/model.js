import { getRandomTrip } from '../mock/mock.js';

const TRIP_COUNT = 5;

export default class TripModel {
  #trips = Array.from({length: TRIP_COUNT}, getRandomTrip);

  get trips() {
    return this.#trips;
  }
}
