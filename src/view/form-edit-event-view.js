import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES, SAME_DATE_OFFSET_IN_MINUTES } from '../constants.js';
import { formatDate } from '../utilities/event.js';
import { DateFormats } from '../constants.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

function createFormEditEventTemplate (event, eventTypeOffers, eventDestination, destinations) {
  const { basePrice, dateFrom, dateTo, offers: eventOffers, type, isDeleting, isSaving, isDisabled } = event;
  const { name, description, pictures } = eventDestination;

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">

                  ${createEventTypeListWrapper(type, isDisabled)}
                  ${createDestinationFieldGroup(type, name, destinations, isDisabled)}
                  ${createTimeFieldGroup(dateFrom, dateTo, isDisabled)}
                  ${createPriceFieldGroup(basePrice, isDisabled)}

                  <button class="event__save-btn  btn  btn--blue" type="submit"${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset"${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  <button class="event__rollup-btn" type="button"${isDisabled ? 'disabled' : ''}>
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${createOffersSection(eventTypeOffers, eventOffers, isDisabled)}
                  ${createDestinationSection(description, pictures)}
                </section>
            </form>
          </li>`;
}

function createEventTypeListWrapper (eventType, isDisabled) {
  const eventTypeListItemsArray = [];
  for (let i = 0; i < TYPES.length; i++) {
    const type = TYPES[i].toLowerCase();
    const typeLabel = TYPES[i];
    const eventTypeListItem = `<div class="event__type-item">
                                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isDisabled ? 'disabled' : ''}>
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

function createDestinationFieldGroup(eventType, name, destinations, isDisabled) {
  const destinationOptionsArray = [];
  for (let i = 0; i < destinations.length; i++) {
    const destinationOption = `<option value="${destinations[i].name}"></option>`;
    destinationOptionsArray.push(destinationOption);
  }
  const destinationOptions = destinationOptionsArray.join('\n');

  return `<div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
                ${eventType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(name ? name : '')}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${destinationOptions}
            </datalist>
          </div>`;
}

function createTimeFieldGroup(dateFrom, dateTo, isDisabled) {
  const formattedDateFrom = dateFrom ? formatDate(dateFrom, DateFormats.FULLDATE) : '';
  const formattedDateTo = dateTo ? formatDate(dateTo, DateFormats.FULLDATE) : '';
  return `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}" ${isDisabled ? 'disabled' : ''}>
          </div>`;
}

function createPriceFieldGroup(basePrice, isDisabled) {
  const stringBasePrice = basePrice.toString();
  return `<div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(stringBasePrice)}" ${isDisabled ? 'disabled' : ''}>
          </div>`;
}

function createOffersSection(eventTypeOffers, eventOffers, isDisabled) {
  if (eventTypeOffers.length < 1) {
    return '';
  }
  const offerSelectorsArray = [];
  for (let i = 0; i < eventTypeOffers.length; i++) {
    const offerTitle = eventTypeOffers[i].title;
    const offerPrice = eventTypeOffers[i].price;
    const offerName = offerTitle.replace(/\s+/g, '').toLowerCase();
    const offerIsChecked = eventOffers.has(eventTypeOffers[i].id) ? 'checked' : '';

    const offerSelector = `<div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}" type="checkbox" name="event-offer-${offerName}" ${offerIsChecked} data-id="${eventTypeOffers[i].id}" ${isDisabled ? 'disabled' : ''}>
                            <label class="event__offer-label" for="event-offer-${offerName}">
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
  const photosContainerTemplate = `<div class="event__photos-container">
                                    <div class="event__photos-tape">
                                      ${destinationPictures}
                                    </div>
                                  </div>`;

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${destinationPictures ? photosContainerTemplate : ''}
          </section>`;
}

export default class FormEditEventView extends AbstractStatefulView {
  #event = null;
  #offers = null;
  #destinations = null;
  #eventTypeOffers = null;
  #eventDestination = null;

  #handleFormSubmit = null;
  #handleCloseButtonClick = null;
  #handleDeleteButtonClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor (event, onFormSubmit, onCloseButtonClick, onDeleteButtonClick, offers, destinations) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this._setState(FormEditEventView.parseEventToState(this.#event));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleDeleteButtonClick = onDeleteButtonClick;

    this.#getOffers(this._state.type);
    this.#getDestination(this._state.destination);

    this._restoreHandlers();
  }

  get template() {
    return createFormEditEventTemplate(this._state, this.#eventTypeOffers, this.#eventDestination, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  static parseEventToState (event) {
    const state = {...event, isSaving: false, isDeleting: false, isDisabled: false};
    return state;
  }

  static parseStateToEvent (state) {
    const event = {...state};

    delete event.isSaving;
    delete event.isDeleting;
    delete event.isDisabled;

    return event;
  }

  _restoreHandlers () {
    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event.event--edit').addEventListener('change', this.#formChangeHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonClickHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offerClickHandler);
    }

    this.#setDatepicker();
  }

  reset (event) {
    this.updateElement(FormEditEventView.parseEventToState(event));
  }

  #getOffers (type) {
    const offersByType = this.#offers.find((offer) => offer.type === type);
    this.#eventTypeOffers = offersByType.offers;
  }

  #getDestination (destinationID) {
    const destination = this.#destinations.find((element) => element.id === destinationID);
    this.#eventDestination = destination;
  }

  #setDatepicker() {
    const dateFromObject = new Date(this._state.dateFrom.getTime());
    dateFromObject.setMinutes(dateFromObject.getMinutes() + SAME_DATE_OFFSET_IN_MINUTES);

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('.event__input--time[id="event-start-time-1"'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        /* eslint-disable */
        time_24hr: true,
        /* eslint-enable */
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('.event__input--time[id="event-end-time-1"'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        /* eslint-disable */
        time_24hr: true,
        /* eslint-enable */
        defaultDate: this._state.dateTo,
        minDate: dateFromObject,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditEventView.parseStateToEvent(this._state));
  };

  #formChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.matches('.event__type-input')) {
      const type = evt.target.value;
      this.#getOffers(type);
      this.updateElement({...this._state, type: type, offers: new Set()});
    }
    if (evt.target.matches('.event__input--destination')) {
      const newDestinationName = evt.target.value;
      const newDestinationId = this.#destinations.find((destination) => destination.name === newDestinationName).id;
      this.#getDestination(newDestinationId);
      this.updateElement({...this._state, destination: this.#eventDestination.id});
    }
    if (evt.target.matches('.event__input--price')) {
      const newPrice = parseInt(evt.target.value, 10);
      this.updateElement({...this._state, basePrice: newPrice});
    }
  };

  #offerClickHandler = (evt) => {
    if (evt.target.matches('.event__offer-checkbox')) {
      const offers = this._state.offers;
      const targetID = evt.target.dataset.id;

      if (offers.has(targetID)) {
        offers.delete(targetID);
      } else {
        offers.add(targetID);
      }

      this.updateElement({...this._state});
    }
  };

  #dateFromChangeHandler = ([dateFrom]) => {
    if (dayjs(this._state.dateTo).diff(dateFrom, 'minutes') < 0) {
      const dateFromObject = new Date(dateFrom.getTime());
      dateFromObject.setMinutes(dateFromObject.getMinutes() + SAME_DATE_OFFSET_IN_MINUTES);

      this.updateElement({...this._state, dateFrom: dateFrom, dateTo: dateFromObject});
    } else {
      this.updateElement({...this._state, dateFrom: dateFrom});
    }
  };

  #dateToChangeHandler = ([dateTo]) => {
    this.updateElement({...this._state, dateTo: dateTo});
  };

  #deleteButtonClickHandler = () => {
    this.#handleDeleteButtonClick();
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseButtonClick();
  };
}
