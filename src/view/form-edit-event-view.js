import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES, DESTINATION_NAMES } from '../constants.js';
import { formatDate } from '../utilities/event.js';
import { DateFormats } from '../constants.js';
import dayjs from 'dayjs';

function createFormEditEventTemplate (event) {
  const { basePrice, dateFrom, dateTo, destination: { name: destinationName, description, pictures }, type, offers } = event;

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">

                  ${createEventTypeListWrapper(type)}
                  ${createDestinationFieldGroup(type, destinationName)}
                  ${createTimeFieldGroup(dateFrom, dateTo)}
                  ${createPriceFieldGroup(basePrice)}

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${createOffersSection(offers)}
                  ${createDestinationSection(description, pictures)}
                </section>
            </form>
          </li>`;
}

function createEventTypeListWrapper (eventType) {
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
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
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

function createDestinationFieldGroup(eventType, destinationName) {
  const destinationOptionsArray = [];
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    const destinationOption = `<option value="${DESTINATION_NAMES[i]}"></option>`;
    destinationOptionsArray.push(destinationOption);
  }
  const destinationOptions = destinationOptionsArray.join('\n');

  return `<div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
                ${eventType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName ? destinationName : ''}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationOptions}
            </datalist>
          </div>`;
}

function createTimeFieldGroup(dateFrom, dateTo) {
  const formattedDateFrom = formatDate(dateFrom, DateFormats.FULLDATE);
  const formattedDateTo = formatDate(dateTo, DateFormats.FULLDATE);
  return `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}">
          </div>`;
}

function createPriceFieldGroup(basePrice) {
  return `<div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>`;
}

function createOffersSection(offers) {
  if (offers.length < 1) {
    return '';
  }
  const offerSelectorsArray = [];
  for (let i = 0; i < offers.length; i++) {
    const offerTitle = offers[i].title;
    const offerPrice = offers[i].price;
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

function createDestinationSection(description, pictures) {
  if (!description) {
    return '';
  }

  const picturesArray = [];
  for (let i = 0; i < pictures.length; i++) {
    const picture = `<img class="event__photo" src="${pictures[i].src}" alt="Event photo"></img>`;
    picturesArray.push(picture);
  }
  const destinationPictures = picturesArray.join('\n');

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPictures}
              </div>
            </div>
          </section>`;
}

export default class FormEditEventView extends AbstractStatefulView {
  #event = null;
  #handleFormSubmit = null;
  #handleFormTypeChange = null;
  #handleFormDestinationChange = null;
  #handleCloseButtonClick = null;

  constructor (event, onFormSubmit, onCloseButtonClick, onFormTypeChange, onFormDestinationChange) {
    super();
    this.#event = event;
    this._setState(FormEditEventView.parseEventToState(this.#event));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleFormTypeChange = onFormTypeChange;
    this.#handleFormDestinationChange = onFormDestinationChange;
    this._restoreHandlers();
  }

  get template() {
    return createFormEditEventTemplate(this._state);
  }

  static parseEventToState (event) {
    if (event.dateFrom instanceof dayjs) {
      const dateFrom = event.dateFrom.toDate();
      const dateTo = event.dateTo.toDate();
      return {...event, dateFrom: dateFrom, dateTo: dateTo};
    }
    return event;
  }

  _restoreHandlers () {
    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event.event--edit').addEventListener('change', this.#formChangeHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
  }

  reset (event) {
    this.updateElement(FormEditEventView.parseEventToState(event));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #formChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('.event__type-input')) {
      const type = evt.target.value.at(0).toUpperCase() + evt.target.value.slice(1);
      const offers = this.#handleFormTypeChange(type);
      this.updateElement({...this._state, type: type, offers: offers});
    }
    if (evt.target.matches('.event__input--destination')) {
      const destinationName = evt.target.value;
      const destination = this.#handleFormDestinationChange(destinationName);
      this.updateElement({...this._state, destination: destination});
    }
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick();
  };
}
