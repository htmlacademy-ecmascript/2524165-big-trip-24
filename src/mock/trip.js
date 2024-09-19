import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from '../utilities/util.js';
import { generateTime } from '../utilities/event.js';
import { TYPES, DESTINATION_NAMES } from '../constants.js';

const MAX_RANDOM_IMAGE_NUMBER = 5;
const MIN_RANDOM_BASE_PRICE = 200;
const MAX_RANDOM_BASE_PRICE = 3000;
const MIN_RANDOM_OFFER_PRICE = 10;
const MAX_RANDOM_OFFER_PRICE = 100;
const EVENTS_COUNT = 10;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

function generateDestination() {
  const randomDescription = getRandomArrayElement(DESCRIPTIONS);
  return (
    {
      description: randomDescription,
      name: getRandomArrayElement(DESTINATION_NAMES),
      pictures: [
        {
          src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_RANDOM_IMAGE_NUMBER)}`,
          description: randomDescription
        }
      ]
    }
  );
}

const OFFERS = [
  {
    type: 'Taxi',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Book tickets',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Book tickets',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Book tickets',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
    ]
  },
  {
    type: 'Drive',
    offers: []
  },
  {
    type: 'Flight',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Choose seats',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add meal',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Travel by train',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
    ]
  },
  {
    type: 'Check-in',
    offers: []
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        title: 'Order Uber',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        title: 'Add breakfast',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Lunch in city',
        price: getRandomInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      }
    ]
  },
];

function generateEvent() {
  return (
    {
      id: nanoid(),
      basePrice: getRandomInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
      dateFrom: '',
      dateTo: '',
      destination: generateDestination(),
      isFavorite: Boolean(getRandomInteger(0, 1)),
      type: getRandomArrayElement(TYPES),
      offers: ['']
    }
  );
}

function getOffersForEventsByType (eventsArr, offersArr) {
  eventsArr.forEach((event) => {
    const offer = offersArr.find((element) => element.type === event.type);
    event.offers = offer.offers;
  });
}

function generateDatesForEvents(eventsArr) {
  eventsArr.forEach((event) => {
    generateTime(event);
  });
}

function getEvents() {
  const randomEvents = Array.from({length: getRandomInteger(0, EVENTS_COUNT)}, generateEvent);
  getOffersForEventsByType(randomEvents, OFFERS);
  generateDatesForEvents(randomEvents);
  return randomEvents;
}


export { getEvents };
