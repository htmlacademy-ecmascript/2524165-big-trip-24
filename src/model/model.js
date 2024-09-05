import { getRandomTrip } from '../mock/mock.js';

const TRIP_COUNT = 5;

export default class TripsModel {
  trips = Array.from({length: TRIP_COUNT}, getRandomTrip);

  getTrips() {
    return this.trips;
  }
}
