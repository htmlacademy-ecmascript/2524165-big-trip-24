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

const DateFormats = {
  FULLDATE: 'DD/MM/YYYY h:mm',
  HOURS: 'H:mm',
  MONTHDAY: 'D/MMM'
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortTypes = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

const ESCAPE_KEY = 'Escape';

export { TYPES, DESTINATION_NAMES, ESCAPE_KEY, DateFormats, FilterTypes, SortTypes };
