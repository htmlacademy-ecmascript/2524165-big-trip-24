import { getRandomInteger } from './util';
import dayjs from 'dayjs';

const MIN_RANDOM_DATE_FROM = -1500;
const MAX_RANDOM_DATE_FROM = 1500;
const MIN_RANDOM_DATE_TO = 10;
const MAX_RANDOM_DATE_TO = 600;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;
const MIN_LETTERS_AMOUNT = 2;

function formatDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function generateTime(event) {
  event.dateFrom = dayjs();
  event.dateFrom = event.dateFrom.minute(event.dateFrom.minute() + getRandomInteger(MIN_RANDOM_DATE_FROM, MAX_RANDOM_DATE_FROM));
  event.dateTo = event.dateFrom;
  event.dateTo = event.dateTo.minute(event.dateTo.minute() + getRandomInteger(MIN_RANDOM_DATE_TO, MAX_RANDOM_DATE_TO));
}

function timeToString (amount, letter) {
  return `${amount}${letter}`;
}

function getTimeFromTo(dateFrom, dateTo) {
  const time = dayjs(dateTo).diff(dateFrom, 'minutes');
  const hours = Math.trunc(time / MINUTES_IN_AN_HOUR);
  const days = Math.trunc(hours / HOURS_IN_A_DAY);
  const minutes = time % MINUTES_IN_AN_HOUR;

  const hoursString = hours ? timeToString(hours, 'H').padStart(MIN_LETTERS_AMOUNT, '0') : '';
  const daysString = days ? timeToString(days, 'D').padStart(MIN_LETTERS_AMOUNT, '0') : '';
  const minutesString = minutes ? timeToString(minutes, 'M').padStart(MIN_LETTERS_AMOUNT, '0') : '';

  return `${daysString} ${hoursString} ${minutesString}`;
}

function checkEventIsFuture (event) {
  const dateNow = dayjs();
  return event.dateFrom > dateNow;
}

function checkEventIsPresent (event) {
  const dateNow = dayjs();
  return event.dateFrom <= dateNow && event.dateTo > dateNow;
}

function checkEventIsPast (event) {
  const dateNow = dayjs();
  return event.dateTo <= dateNow;
}

function sortByPrice(firstEvent, secondEvent) {
  return secondEvent.basePrice - firstEvent.basePrice;
}

function sortByTime(firstEvent, secondEvent) {
  const firstEventTimeDifference = dayjs(firstEvent.dateTo).diff(firstEvent.dateFrom, 'minutes');
  const secondEventTimeDifference = dayjs(secondEvent.dateTo).diff(secondEvent.dateFrom, 'minutes');

  return secondEventTimeDifference - firstEventTimeDifference;
}

function sortByDay(firstEvent, secondEvent) {
  const firstEventDay = dayjs(firstEvent.dateFrom).day();
  const secondEventDay = dayjs(secondEvent.dateFrom).day();

  return firstEventDay - secondEventDay;
}

export { formatDate, getTimeFromTo, generateTime, checkEventIsFuture, checkEventIsPast, checkEventIsPresent, sortByPrice, sortByTime, sortByDay};
