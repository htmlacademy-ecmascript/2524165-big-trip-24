import { getRandomInteger } from '../utilities/util';

const MIN_RANDOM_OFFER_PRICE = 10;
const MAX_RANDOM_OFFER_PRICE = 100;

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

function getOffers () {
  return OFFERS;
}

export { getOffers };
