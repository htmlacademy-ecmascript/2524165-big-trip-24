import { checkEventIsFuture, checkEventIsPast, checkEventIsPresent } from './event.js';
import { FilterTypes } from '../constants.js';

const Filters = {
  [FilterTypes.EVERYTHING]: (events) => events,
  [FilterTypes.FUTURE]: (events) => events.filter((event) => checkEventIsFuture(event)),
  [FilterTypes.PRESENT]: (events) => events.filter((event) => checkEventIsPresent(event)),
  [FilterTypes.PAST]: (events) => events.filter((event) => checkEventIsPast(event)),
};

export { Filters };
