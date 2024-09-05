import { getRandomArrayElement, getRandomPositiveInteger } from '../utilities/util';
import { TYPES, DESTINATION_NAMES } from '../constants.js';

const RANDOM_IMAGE_NUMBER = 5;
const MIN_RANDOM_BASE_PRICE = 200;
const MAX_RANDOM_BASE_PRICE = 3000;
const MIN_RANDOM_OFFER_PRICE = 10;
const MAX_RANDOM_OFFER_PRICE = 100;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const DESTINATIONS = [
  {
    description: DESCRIPTIONS[0],
    name: DESTINATION_NAMES[0],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${RANDOM_IMAGE_NUMBER}`,
        description: DESCRIPTIONS[0]
      }
    ]
  },
  {
    description: DESCRIPTIONS[1],
    name: DESTINATION_NAMES[1],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${RANDOM_IMAGE_NUMBER}`,
        description: DESCRIPTIONS[1]
      }
    ]
  },
  {
    description: DESCRIPTIONS[2],
    name: DESTINATION_NAMES[2],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${RANDOM_IMAGE_NUMBER}`,
        description: DESCRIPTIONS[2]
      }
    ]
  },
  {
    description: DESCRIPTIONS[3],
    name: DESTINATION_NAMES[3],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${RANDOM_IMAGE_NUMBER}`,
        description: DESCRIPTIONS[3]
      }
    ]
  },
  {
    description: DESCRIPTIONS[4],
    name: DESTINATION_NAMES[4],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${RANDOM_IMAGE_NUMBER}`,
        description: DESCRIPTIONS[4]
      }
    ]
  }
];

const OFFERS = [
  {
    type: 'Taxi',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Book tickets',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Book tickets',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        title: 'Switch to comfort',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Book tickets',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
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
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add luggage',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Choose seats',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Add meal',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Travel by train',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
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
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        title: 'Add breakfast',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      },
      {
        title: 'Lunch in city',
        price: getRandomPositiveInteger(MIN_RANDOM_OFFER_PRICE, MAX_RANDOM_OFFER_PRICE)
      }
    ]
  },
];

const TRIPS = [
  {
    basePrice: getRandomPositiveInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
    dateFrom: '2019-03-20T08:25',
    dateTo: '2019-03-20T09:25',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    type: getRandomArrayElement(TYPES),
    offers: ['']
  },
  {
    basePrice: getRandomPositiveInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
    dateFrom: '2019-03-19T18:00',
    dateTo: '2019-03-19T19:00',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    type: getRandomArrayElement(TYPES),
    offers: ['']
  },
  {
    basePrice: getRandomPositiveInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
    dateFrom: '2019-03-19T10:00',
    dateTo: '2019-03-19T11:00',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    type: getRandomArrayElement(TYPES),
    offers: ['']
  },
  {
    basePrice: getRandomPositiveInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
    dateFrom: '2019-03-19T11:20',
    dateTo: '2019-03-19T13:00',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    type: getRandomArrayElement(TYPES),
    offers: ['']
  },
  {
    basePrice: getRandomPositiveInteger(MIN_RANDOM_BASE_PRICE, MAX_RANDOM_BASE_PRICE),
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: getRandomArrayElement(DESTINATIONS),
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    type: getRandomArrayElement(TYPES),
    offers: ['']
  }
];

function getOffersForTripByType (trip, offersArr) {
  const offer = offersArr.find((element) => element.type === trip.type);
  trip.offers = offer.offers;
}

function getRandomTrip() {
  const randomIndex = getRandomPositiveInteger(0, TRIPS.length - 1);
  getOffersForTripByType(TRIPS[randomIndex], OFFERS);
  return TRIPS[randomIndex];
}


export { getRandomTrip };
