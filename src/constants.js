const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DESTINATION_NAMES = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
  'New York',
  'London',
];

const DateFormat = {
  FULLDATE: 'DD/MM/YYYY HH:mm',
  HOURS: 'HH:mm',
  MONTHDAY: 'MMM D',
  MONTHDAY_NOSLASH: 'D MMM'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

const ActionType = {
  ADD_TRIP: 'ADD_TRIP',
  UPDATE_TRIP: 'UPDATE_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

const UpdateType = {
  PATCH: 'Patch',
  MINOR: 'Minor',
  MAJOR: 'Major',
  INIT: 'Init',
  ERROR: 'Error'
};

const SAME_DATE_OFFSET_IN_MINUTES = 5;

export { TYPES, DESTINATION_NAMES, DateFormat, FilterType, SortType, ActionType, UpdateType, SAME_DATE_OFFSET_IN_MINUTES };
