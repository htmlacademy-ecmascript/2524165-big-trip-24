import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from '../utilities/util.js';
import { generateTime } from '../utilities/event.js';
import { TYPES, DESTINATION_NAMES } from '../constants.js';

const MIN_RANDOM_BASE_PRICE = 200;
const MAX_RANDOM_BASE_PRICE = 3000;
const EVENTS_COUNT = 10;

function generateEvent() {
  return (
    {
      id: nanoid(),
      basePrice: getRandomInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
      dateFrom: '',
      dateTo: '',
      destination: getRandomArrayElement(DESTINATION_NAMES),
      isFavorite: Boolean(getRandomInteger(0, 1)),
      type: getRandomArrayElement(TYPES),
      offers: ''
    }
  );
}

function generateDatesForEvents(eventsArr) {
  eventsArr.forEach((event) => {
    generateTime(event);
  });
}

function getEvents() {
  const randomEvents = Array.from({length: getRandomInteger(0, EVENTS_COUNT)}, generateEvent);
  //getOffersForEventsByType(randomEvents, OFFERS);
  generateDatesForEvents(randomEvents);
  return randomEvents;
}


export { getEvents };
