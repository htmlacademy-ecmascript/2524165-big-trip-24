import { checkEventIsFuture, checkEventIsPast, checkEventIsPresent } from './event.js';
import { FilterType } from '../constants.js';

const Filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => checkEventIsFuture(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => checkEventIsPresent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => checkEventIsPast(event)),
};

export { Filter };
