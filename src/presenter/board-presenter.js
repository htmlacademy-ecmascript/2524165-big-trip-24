import { render } from '../framework/render.js';
import { updateEvent, sortByDay, sortByPrice, sortByTime } from '../utilities/event.js';
import FilterListView from '../view/filter-list-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventPresenter from './event-presenter.js';
import { SortTypes } from '../constants.js';

export default class BoardPresenter {
  #filterContainer = null;
  #filters = [];
  #tripModel = null;
  #eventsContainer = null;
  #eventListComponent = new EventListView();
  #events = [];
  #eventPresenters = new Map();
  #currentSortType = SortTypes.DAY;

  constructor(filterContainer, eventsContainer, tripModel) {
    this.#filterContainer = filterContainer;
    this.#eventsContainer = eventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#events = [...this.#tripModel.events];
    this.#filters = this.#tripModel.filters;

    this.#renderFilterList();
    if (this.#events.length === 0) {
      this.#renderEmptyTripList();
      return;
    }
    this.#sortEvents();
    this.#renderSortView();
    this.#renderEvents();
  }

  #renderFilterList () {
    render(new FilterListView(this.#filters), this.#filterContainer);
  }

  #renderEmptyTripList () {
    render(new EventListEmptyView(), this.#eventsContainer);
  }

  #renderSortView () {
    render(new SortView(this.#handleSortChange), this.#eventsContainer);
  }

  #renderEvents () {
    render(this.#eventListComponent, this.#eventsContainer);

    const eventsCount = this.#events.length;
    for (let i = 0; i < eventsCount; i++) {
      const eventPresenter = new EventPresenter(this.#eventListComponent.element, this.#dataChangeHandler, this.#handleModeChange);
      eventPresenter.init(this.#events[i]);
      this.#eventPresenters.set(this.#events[i].id, eventPresenter);
    }
  }

  #clearEventList () {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #sortEvents () {
    switch (this.#currentSortType) {
      case SortTypes.DAY:
        this.#events.sort(sortByDay);
        break;
      case SortTypes.PRICE:
        this.#events.sort(sortByPrice);
        break;
      case SortTypes.TIME:
        this.#events.sort(sortByTime);
        break;
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
    this.#sortEvents();
    this.#clearEventList();
    this.#renderEvents();
  };

  #dataChangeHandler = (updatedEvent) => {
    this.#events = updateEvent(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

}
