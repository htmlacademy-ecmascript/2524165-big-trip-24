import { checkTripIsFuture, checkTripIsPast, checkTripIsPresent } from './trip.js';
import { FilterTypes } from '../constants.js';

const Filters = {
  [FilterTypes.EVERYTHING]: (trips) => trips,
  [FilterTypes.FUTURE]: (trips) => trips.filter((trip) => checkTripIsFuture(trip)),
  [FilterTypes.PRESENT]: (trips) => trips.filter((trip) => checkTripIsPresent(trip)),
  [FilterTypes.PAST]: (trips) => trips.filter((trip) => checkTripIsPast(trip)),
};

export { Filters };
