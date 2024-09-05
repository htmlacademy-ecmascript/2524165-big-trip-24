import dayjs from 'dayjs';

function getRandomArrayElement (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPositiveInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function formatDate(date, format) {
  return dayjs(date).format(format);
}

function timeFromTo(dateFrom, dateTo) {
  const time = dayjs(dateTo).diff(dateFrom, 'minutes');
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;
  const hoursString = hours ? `${hours}H ` : '';
  const minutesString = minutes ? `${minutes}M` : '';

  return `${hoursString}${minutesString}`;
}

export { getRandomArrayElement, getRandomPositiveInteger, formatDate, timeFromTo };
