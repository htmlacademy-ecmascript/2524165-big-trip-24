import AbstractView from '../framework/view/abstract-view';
import { formatDate, getTimeFromTo } from '../utilities/event';
import { DateFormat } from '../constants';

function createOffersList(offersList, eventOffers) {
  const selectedOffers = [];
  for (let i = 0; i < offersList.length; i++) {
    if (!eventOffers.has(offersList[i].id)) {
      continue;
    }
    const selectedOffer = `<li class="event__offer">
                      <span class="event__offer-title">${offersList[i].title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${offersList[i].price}</span>
                    </li>`;
    selectedOffers.push(selectedOffer);
  }
  const selectedOffersResult = selectedOffers.join('\n');
  return `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${selectedOffersResult}
            </ul>`;
}

function createListItemPointTemplate (event, offersList, destinationName) {
  if (event === null) {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }
  const { basePrice, dateFrom, dateTo, isFavorite, offers: eventOffers, type } = event;

  const favoriteButtonActive = isFavorite ? 'event__favorite-btn--active' : '';
  const typeIconName = type.toLowerCase();

  const formattedHoursDateFrom = dateFrom ? formatDate(dateFrom, DateFormat.HOURS) : '';
  const formattedHoursDateTo = dateTo ? formatDate(dateTo, DateFormat.HOURS) : '';
  const formattedMonthDateFrom = dateFrom ? formatDate(dateFrom, DateFormat.MONTHDAY) : '';

  let formattedDateFromTo = '';
  if (dateFrom && dateTo) {
    formattedDateFromTo = getTimeFromTo(dateFrom, dateTo);
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${formattedMonthDateFrom}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${typeIconName}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${formattedHoursDateFrom}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${formattedHoursDateTo}</time>
                  </p>
                  <p class="event__duration">${formattedDateFromTo}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>

                ${createOffersList(offersList, eventOffers)}

                <button class="event__favorite-btn ${favoriteButtonActive}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventView extends AbstractView {
  #event = null;
  #offers = null;
  #destinations = null;
  #eventOffers = null;
  #eventDestination = null;
  #handleEditButtonClick = null;
  #handleFavoriteButtonClick = null;

  constructor (event, onEditButtonClick, onFavoriteButtonClick, offers, destinations) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#getOffers(this.#event.type);
    this.#getDestination(this.#event.destination);

    this.#handleEditButtonClick = onEditButtonClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditButtonClick);
    this.#handleFavoriteButtonClick = onFavoriteButtonClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonClick);
  }

  get template() {
    return createListItemPointTemplate(this.#event, this.#eventOffers, this.#eventDestination.name);
  }

  #getOffers (type) {
    const offersByType = this.#offers.find((offer) => offer.type === type);
    this.#eventOffers = offersByType.offers;
  }

  #getDestination (destinationID) {
    const destination = this.#destinations.find((element) => element.id === destinationID);
    this.#eventDestination = destination;
  }

  #onEditButtonClick = () => {
    this.#handleEditButtonClick();
  };

  #onFavoriteButtonClick = () => {
    this.#handleFavoriteButtonClick();
  };

}
