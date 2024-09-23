import { DESTINATION_NAMES } from '../constants';
import { getRandomArrayElement, getRandomInteger } from '../utilities/util';

const MAX_RANDOM_IMAGE_NUMBER = 5;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const DestinationDescriptions = {};
const DestinationPictures = {};

function generateDestinationDescriptions () {
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    DestinationDescriptions[DESTINATION_NAMES[i]] = getRandomArrayElement(DESCRIPTIONS);
  }
}

function generateDestinationPictures () {
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    DestinationPictures[DESTINATION_NAMES[i]] = [];
  }
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    const picturesCount = getRandomInteger(1, 5);
    for (let j = 0; j < picturesCount; j++) {
      const picture = {
        description: getRandomArrayElement(DESCRIPTIONS),
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_RANDOM_IMAGE_NUMBER)}`
      };
      DestinationPictures[DESTINATION_NAMES[i]].push(picture);
    }
  }
}

function generateDestinations () {
  const destinationsArr = [];
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    const name = DESTINATION_NAMES[i];
    const destination = {
      name,
      description: DestinationDescriptions[name],
      pictures: DestinationPictures[name],
    };
    destinationsArr.push(destination);
  }
  return destinationsArr;
}

function getDestinations() {
  generateDestinationDescriptions();
  generateDestinationPictures();

  return generateDestinations();
}

export { getDestinations };
