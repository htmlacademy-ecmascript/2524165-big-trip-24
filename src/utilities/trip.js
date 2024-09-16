import { getRandomInteger } from './util';
import dayjs from 'dayjs';

const MIN_RANDOM_DATE_FROM = -300;
const MAX_RANDOM_DATE_FROM = 300;
const MIN_RANDOM_DATE_TO = 10;
const MAX_RANDOM_DATE_TO = 600;

function formatDate(date, format) {
  return date.format(format);
}

function generateTime(trip) {
  trip.dateFrom = dayjs();
  trip.dateFrom = trip.dateFrom.minute(trip.dateFrom.minute() + getRandomInteger(MIN_RANDOM_DATE_FROM, MAX_RANDOM_DATE_FROM));
  trip.dateTo = trip.dateFrom;
  trip.dateTo = trip.dateTo.minute(trip.dateTo.minute() + getRandomInteger(MIN_RANDOM_DATE_TO, MAX_RANDOM_DATE_TO));
}

function getTimeFromTo(dateFrom, dateTo) {
  const time = dayjs(dateTo).diff(dateFrom, 'minutes');
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;
  const hoursString = hours ? `${hours}H ` : '';
  const minutesString = minutes ? `${minutes}M` : '';

  return `${hoursString}${minutesString}`;
}

function checkTripIsFuture (trip) {
  const dateNow = dayjs();
  return trip.dateFrom > dateNow;
}

function checkTripIsPresent (trip) {
  const dateNow = dayjs();
  return trip.dateFrom <= dateNow && trip.dateTo > dateNow;
}

function checkTripIsPast (trip) {
  const dateNow = dayjs();
  return trip.dateTo <= dateNow;
}

function updateTrip (trips, updatedTrip) {
  return trips.map((trip) => trip.id === updatedTrip ? updatedTrip : trip);
}

export { formatDate, getTimeFromTo, generateTime, checkTripIsFuture, checkTripIsPast, checkTripIsPresent, updateTrip };
