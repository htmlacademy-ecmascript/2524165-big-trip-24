import { render, replace, remove } from '../framework/render';
import { sortByDay } from '../utilities/event';
import { DateFormats } from '../constants';
import { formatDate } from '../utilities/event';
import HeaderView from '../view/header-view';


export default class HeaderPresenter {
  #tripModel = null;
  #offers = null;
  #destinations = null;
  #headerContainer = null;
  #headerComponent = null;

  #destinationNames = null;
  #totalPrice = null;
  #dateStart = null;
  #dateEnd = null;

  constructor (headerContainer, tripModel, offers, destinations) {
    this.#tripModel = tripModel;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#headerContainer = headerContainer;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get events () {
    const events = this.#tripModel.events;
    const sortedEvents = events.sort(sortByDay);
    return sortedEvents;
  }

  init() {
    const events = this.events;
    const prevHeaderComponent = this.#headerComponent;

    this.#summarizeEventsData(events);

    this.#headerComponent = new HeaderView(this.#destinationNames, this.#totalPrice, this.#dateStart, this.#dateEnd);

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#headerContainer);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #summarizeEventsData (events) {
    const destinationSet = new Set();
    events.forEach((event) => destinationSet.add(this.#getEventDestinationName(event)));
    this.#destinationNames = destinationSet;

    this.#totalPrice = this.#getEventsTotalPrice(events);

    this.#dateStart = formatDate(events.at(0).dateFrom, DateFormats.MONTHDAY_NOSLASH);
    this.#dateEnd = formatDate(events.at(-1).dateTo, DateFormats.MONTHDAY_NOSLASH);
  }

  #getEventsTotalPrice (events) {
    let totalPrice = 0;
    events.forEach((event) => {
      totalPrice += event.basePrice;
      totalPrice += this.#getEventOffersTotalPrice(event);
    });

    return totalPrice;
  }

  #getEventOffersTotalPrice (event) {
    const eventType = event.type;
    const offersByType = this.#offers.find((offer) => offer.type === eventType);
    const eventOffersIDs = event.offers;

    let eventOffersTotalPrice = 0;

    for (let i = 0; i < offersByType.length; i++) {
      for (let j = 0; j < eventOffersIDs.length; j++) {
        if (offersByType[i].id === eventOffersIDs[j]) {
          eventOffersTotalPrice += offersByType[i].price;
        }
      }
    }

    return eventOffersTotalPrice;
  }

  #getEventDestinationName (event) {
    const eventDestination = this.#destinations.find((destination) => destination.id === event.destination);
    return eventDestination.name;
  }

  #handleModelEvent = () => {
    this.init();
  };

}
