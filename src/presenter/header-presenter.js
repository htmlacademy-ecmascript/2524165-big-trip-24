import { render, replace, remove, RenderPosition } from '../framework/render';
import { sortByDay } from '../utilities/event';
import { DateFormats } from '../constants';
import { formatDate } from '../utilities/event';
import HeaderView from '../view/header-view';


export default class HeaderPresenter {
  #tripModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #headerContainer = null;
  #headerComponent = null;

  #destinationNames = null;
  #totalPrice = null;
  #dateStart = null;
  #dateEnd = null;

  constructor (headerContainer, tripModel, offersModel, destinationsModel) {
    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#headerContainer = headerContainer;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get events () {
    const events = this.#tripModel.events;
    const sortedEvents = events.sort(sortByDay);
    return sortedEvents;
  }

  get offers () {
    const offers = this.#offersModel.offers;
    return offers;
  }

  get destinations () {
    const destinations = this.#destinationsModel.destinations;
    return destinations;
  }

  init() {
    const prevHeaderComponent = this.#headerComponent;

    const events = this.events;
    if (events.length === 0) {
      remove(this.#headerComponent);
      return;
    }

    this.#summarizeEventsData(events);

    this.#headerComponent = new HeaderView(this.#destinationNames, this.#totalPrice, this.#dateStart, this.#dateEnd);

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #summarizeEventsData (events) {
    const destinationSet = new Set();
    events.forEach((event) => destinationSet.add(this.#getEventDestinationName(event)));
    this.#destinationNames = Array.from(destinationSet);

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
    const offersByType = this.offers.find((offer) => offer.type === eventType).offers;
    const eventOffersIDs = event.offers;

    let eventOffersTotalPrice = 0;

    for (let i = 0; i < offersByType.length; i++) {
      if (eventOffersIDs.has(offersByType[i].id)) {
        eventOffersTotalPrice += offersByType[i].price;
      }
    }

    return eventOffersTotalPrice;
  }

  #getEventDestinationName (event) {
    const eventDestination = this.destinations.find((destination) => destination.id === event.destination);
    return eventDestination.name;
  }

  #handleModelEvent = () => {
    this.init();
  };

}
