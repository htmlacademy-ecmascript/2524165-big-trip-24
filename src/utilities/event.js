import dayjs from 'dayjs';

const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;
const MIN_LETTERS_AMOUNT = 3;

function formatDate(date, dateFormat) {
  return dayjs(date).format(dateFormat);
}

function timeToString (amount, letter) {
  return `${amount}${letter}`;
}

function getTimeFromTo(dateFrom, dateTo) {
  const convertedDateFrom = dayjs(dateFrom);
  const convertedDateTo = dayjs(dateTo);

  const time = convertedDateTo.diff(convertedDateFrom, 'minutes');
  const hours = Math.trunc(time / MINUTES_IN_AN_HOUR % HOURS_IN_A_DAY);
  const days = Math.trunc(time / MINUTES_IN_AN_HOUR / HOURS_IN_A_DAY);
  const minutes = time % MINUTES_IN_AN_HOUR;

  const hoursString = timeToString(hours, 'H').padStart(MIN_LETTERS_AMOUNT, '0');
  const daysString = days ? timeToString(days, 'D').padStart(MIN_LETTERS_AMOUNT, '0') : '';
  const minutesString = timeToString(minutes, 'M').padStart(MIN_LETTERS_AMOUNT, '0');

  return `${daysString} ${hoursString} ${minutesString}`;
}

function checkEventIsFuture (event) {
  const dateNow = dayjs();
  const convertedDateFrom = dayjs(event.dateFrom);

  return convertedDateFrom > dateNow;
}

function checkEventIsPresent (event) {
  const dateNow = dayjs();
  const convertedDateFrom = dayjs(event.dateFrom);
  const convertedDateTo = dayjs(event.dateTo);

  return convertedDateFrom <= dateNow && convertedDateTo > dateNow;
}

function checkEventIsPast (event) {
  const dateNow = dayjs();
  const convertedDateTo = dayjs(event.dateTo);

  return convertedDateTo <= dateNow;
}

function sortByPrice(firstEvent, secondEvent) {
  return secondEvent.basePrice - firstEvent.basePrice;
}

function sortByTime(firstEvent, secondEvent) {
  const convertedFirstEventDateFrom = dayjs(firstEvent.dateFrom);
  const convertedFirstEventDateTo = dayjs(firstEvent.dateTo);
  const convertedSecondEventDateFrom = dayjs(secondEvent.dateFrom);
  const convertedSecondEventDateTo = dayjs(secondEvent.dateTo);

  const firstEventTimeDifference = convertedFirstEventDateTo.diff(convertedFirstEventDateFrom, 'minutes');
  const secondEventTimeDifference = convertedSecondEventDateTo.diff(convertedSecondEventDateFrom, 'minutes');

  return secondEventTimeDifference - firstEventTimeDifference;
}

function sortByDay(firstEvent, secondEvent) {
  const firstEventDateFrom = dayjs(firstEvent.dateFrom);
  const secondEventDateFrom = dayjs(secondEvent.dateFrom);

  return firstEventDateFrom.diff(secondEventDateFrom);
}

export { formatDate, getTimeFromTo, checkEventIsFuture, checkEventIsPast, checkEventIsPresent, sortByPrice, sortByTime, sortByDay};
