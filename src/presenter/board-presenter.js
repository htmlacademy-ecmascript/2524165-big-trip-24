import { render, remove } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByTime } from '../utilities/event.js';
import { SortTypes, ActionTypes, UpdateTypes } from '../constants.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class BoardPresenter {
  #tripModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #offers = [];
  #destinations = [];
  #eventsContainer = null;
  #eventListComponent = new EventListView();
  #sortListComponent = null;
  #emptyListComponent = new EventListEmptyView();
  #eventPresenters = new Map();
  #currentSortType = SortTypes.DAY;

  #addEventFormCloseHandler = null;

  constructor(eventsContainer, tripModel, offersModel, destinationsModel, onAddEventFormClose) {
    this.#eventsContainer = eventsContainer;
    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#addEventFormCloseHandler = onAddEventFormClose;

    this.#tripModel.addObserver(this.#handleModelChange);
  }

  init() {
    //this.#filters = this.#tripModel.filters;
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;
    this.#getOffersForEventsByType(this.events, this.#offers);
    this.#getDestinationsForEventsByType(this.events, this.#destinations);

    this.#renderBoard();
  }

  get events () {
    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return [...this.#tripModel.events].sort(sortByDay);
      case SortTypes.PRICE:
        return [...this.#tripModel.events].sort(sortByPrice);
      case SortTypes.TIME:
        return [...this.#tripModel.events].sort(sortByTime);
    }
    return this.#tripModel.events;
  }

  createEvent () {
    
  }

  #getOffersForEventsByType (eventsArr, offersArr) {
    eventsArr.forEach((event) => {
      const offer = offersArr.find((element) => element.type === event.type);
      event.offers = offer.offers;
    });
  }

  #getDestinationsForEventsByType (eventsArr, destinationsArr) {
    eventsArr.forEach((event) => {
      const destination = destinationsArr.find((element) => element.name === event.destination);
      event.destination = destination;
    });
  }

  #renderEmptyEventsList () {
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderSortView () {
    this.#sortListComponent = new SortView(this.#handleSortChange);
    render(this.#sortListComponent, this.#eventsContainer);
  }

  #renderEvents () {
    render(this.#eventListComponent, this.#eventsContainer);

    const eventsCount = this.events.length;
    for (let i = 0; i < eventsCount; i++) {
      const eventPresenter = new EventPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#handleModeChange, this.#handleFormTypeChange, this.#handleFormDestinationChange);
      eventPresenter.init(this.events[i]);
      this.#eventPresenters.set(this.events[i].id, eventPresenter);
    }
  }

  #clearEvents () {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderBoard () {
    if (this.events.length === 0) {
      this.#renderEmptyEventsList();
      return;
    }
    this.#renderSortView();
    this.#renderEvents();
  }

  #clearBoard (resetSortType = false) {
    this.#clearEvents();

    remove(this.#sortListComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderEvents();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case ActionTypes.ADD_TRIP:
        this.#tripModel.addEvent(updateType, update);
        break;
      case ActionTypes.UPDATE_TRIP:
        this.#tripModel.updateEvent(updateType, update);
        break;
      case ActionTypes.DELETE_TRIP:
        this.#tripModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelChange = (updateType, update) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#eventPresenters.get(update.id).init(update);
        break;
      case UpdateTypes.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleFormTypeChange = (type) => {
    const offers = this.#offers.find((element) => element.type === type);
    return offers.offers;
  };

  #handleFormDestinationChange = (destinationName) => {
    const destination = this.#destinations.find((element) => element.name === destinationName);
    return destination;
  };

  #handleAddEventFormClose = () => {
    this.#addEventFormCloseHandler();
  };

}
