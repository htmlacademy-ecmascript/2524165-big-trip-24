import { render, remove, RenderPosition } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByTime } from '../utilities/event.js';
import { SortTypes, ActionTypes, UpdateTypes, FilterTypes } from '../constants.js';
import { Filters } from '../utilities/filter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';

export default class BoardPresenter {
  #tripModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #eventsContainer = null;
  #eventListComponent = new EventListView();
  #sortListComponent = null;
  #emptyListComponent = null;
  #loadingComponent = new LoadingView();
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortTypes.DAY;

  #isNewEventFormVisible = false;
  #isLoading = true;

  constructor(eventsContainer, tripModel, filterModel, offersModel, destinationsModel) {
    this.#eventsContainer = eventsContainer;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#tripModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderBoard();
  }

  get events () {
    const filterType = this.#filterModel.filter;
    const events = this.#tripModel.events;
    const filteredTasks = Filters[filterType](events);

    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return filteredTasks.sort(sortByDay);
      case SortTypes.PRICE:
        return filteredTasks.sort(sortByPrice);
      case SortTypes.TIME:
        return filteredTasks.sort(sortByTime);
    }
    return filteredTasks;
  }

  get offers () {
    return this.#offersModel.offers;
  }

  get destinations () {
    return this.#destinationsModel.destinations;
  }

  createEvent () {
    if (!this.#isNewEventFormVisible) {
      this.#currentSortType = SortTypes.DAY;
      this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);

      this.#newEventPresenter = new NewEventPresenter(this.#eventListComponent.element, this.#handleViewAction, this.offers, this.destinations);

      remove(this.#emptyListComponent);
    } else {
      this.#renderEmptyEventsList();
    }
    this.#isNewEventFormVisible = !this.#isNewEventFormVisible;
    this.#newEventPresenter.init();
  }

  #resetSortAndFilterTypes = () => {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);
  };

  #renderEmptyEventsList () {
    if (this.events.length === 0) {
      this.#emptyListComponent = new EventListEmptyView(this.#filterModel.filter);
      render(this.#emptyListComponent, this.#eventsContainer);
    }
  }

  #renderSortView () {
    this.#sortListComponent = new SortView(this.#handleSortChange, this.#currentSortType);
    render(this.#sortListComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading () {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderBoard () {
    render(this.#eventListComponent, this.#eventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const events = this.events;
    const eventsCount = events.length;

    this.#renderEmptyEventsList();
    this.#renderSortView();

    for (let i = 0; i < eventsCount; i++) {
      const eventPresenter = new EventPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#handleModeChange, this.offers, this.destinations);
      eventPresenter.init(this.events[i]);
      this.#eventPresenters.set(this.events[i].id, eventPresenter);
    }
  }

  #clearBoard (resetSortType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortListComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #handleModeChange = () => {
    if (this.#isNewEventFormVisible) {
      this.#newEventPresenter.destroy();
      this.#isNewEventFormVisible = !this.#isNewEventFormVisible;
    }
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
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
      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

}
