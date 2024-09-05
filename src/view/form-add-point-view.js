import { createElement } from '../render';
import { TYPES, DESTINATION_NAMES } from '../constants.js';
import { formatDate } from '../utilities/util.js';
import { DateFormats } from '../constants.js';

const DEFAULT_TYPE = 'Taxi';
const DEFAULT_OFFER_PRICE = 10;
const DEFAULT_OFFERS = [
  {
    title: 'Switch to comfort',
    price: DEFAULT_OFFER_PRICE
  },
  {
    title: 'Add luggage',
    price: DEFAULT_OFFER_PRICE
  }
];

const BLANK_TRIP = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
  type : DEFAULT_TYPE,
  offers: DEFAULT_OFFERS,
};

function createFormAddPointTemplate () {
  const offers = BLANK_TRIP.offers;
  const destinationDescription = BLANK_TRIP.destination.description;

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">

                  ${createEventTypeListWrapper()}
                  ${createDestinationFieldGroup()}
                  ${createTimeFieldGroup()}
                  ${createPriceFieldGroup()}

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">

                    ${createOffersSection(offers)}
                    ${createDestinationSection(destinationDescription)}

                  </section>
                </section>
              </form>
            </li>`;
}

function createEventTypeListWrapper () {
  const typeIconName = BLANK_TRIP.type.toLowerCase();

  const eventTypeListItemsArray = [];
  for (let i = 0; i < TYPES.length; i++) {
    const type = TYPES[i].toLowerCase();
    const typeLabel = TYPES[i];
    const eventTypeListItem = `<div class="event__type-item">
                                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${typeLabel}</label>
                              </div>`;
    eventTypeListItemsArray.push(eventTypeListItem);
  }
  const eventTypeListItems = eventTypeListItemsArray.join('\n');

  return `<div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeIconName}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeListItems}
              </fieldset>
            </div>
          </div>`;
}

function createDestinationFieldGroup() {
  const type = BLANK_TRIP.type;
  const destinationName = BLANK_TRIP.destination.name;

  const destinationOptionsArray = [];
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    const destinationOption = `<option value="${DESTINATION_NAMES[i]}"></option>`;
    destinationOptionsArray.push(destinationOption);
  }
  const destinationOptions = destinationOptionsArray.join('\n');

  return `<div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationOptions}
            </datalist>
          </div>`;
}

function createTimeFieldGroup() {
  const formattedDateFrom = BLANK_TRIP.dateFrom ? formatDate(BLANK_TRIP.dateFrom, DateFormats.FULLDATE) : '';
  const formattedDateTo = BLANK_TRIP.dateTo ? formatDate(BLANK_TRIP.dateTo, DateFormats.FULLDATE) : '';
  return `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}">
          </div>`;
}

function createPriceFieldGroup() {
  const basePrice = BLANK_TRIP.basePrice;
  return `<div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>`;
}

function createOffersSection() {
  if (BLANK_TRIP.offers.length < 1) {
    return '';
  }
  const offerSelectorsArray = [];
  for (let i = 0; i < BLANK_TRIP.offers.length; i++) {
    const offerTitle = BLANK_TRIP.offers[i].title;
    const offerPrice = BLANK_TRIP.offers[i].price;
    const offerName = offerTitle.replace(/\s+/g, '').toLowerCase();
    const offerSelector = `<div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" checked>
                            <label class="event__offer-label" for="event-offer-${offerName}-1">
                              <span class="event__offer-title">${offerTitle}</span>
                              &plus;&euro;&nbsp;
                              <span class="event__offer-price">${offerPrice}</span>
                            </label>
                          </div>`;
    offerSelectorsArray.push(offerSelector);
  }
  const offerSelectors = offerSelectorsArray.join('\n');

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offerSelectors}
            </div>
          </section>`;
}

function createDestinationSection() {
  if (!BLANK_TRIP.destination.name) {
    return '';
  }
  const destination = BLANK_TRIP.destination;
  const destinationDescription = destination.description;

  const destinationPicturesArray = [];
  for (let i = 0; i < destination.pictures.length; i++) {
    const destinationPicture = `<img class="event__photo" src="${destination.pictures[i].src}" alt="Event photo"></img>`;
    destinationPicturesArray.push(destinationPicture);
  }
  const destinationPictures = destinationPicturesArray.join('\n');

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationDescription}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPictures}
              </div>
            </div>
          </section>`;
}

export default class FormAddPointView {

  getTemplate() {
    return createFormAddPointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
