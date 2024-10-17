import { render, remove, RenderPosition } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByTime } from '../utilities/event.js';
import { SortType, ActionType, UpdateType, FilterType } from '../constants.js';
import { Filter } from '../utilities/filter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 200,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #tripModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #eventsContainer = null;
  #sortListComponent = null;
  #emptyListComponent = null;
  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();
  #eventPresenters = new Map();
  #newEventPresenter = null;

  #currentSortType = SortType.DAY;

  #isNewEventFormVisible = false;
  #isLoading = true;

  #handleToggleNewEventButton = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor (eventsContainer, tripModel, filterModel, offersModel, destinationsModel, onToggleNewEventButton) {
    this.#eventsContainer = eventsContainer;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#handleToggleNewEventButton = onToggleNewEventButton;

    this.#tripModel.addObserver(this.#onModelChange);
    this.#filterModel.addObserver(this.#onModelChange);
  }

  get events () {
    const filterType = this.#filterModel.filter;
    const events = this.#tripModel.events;
    const filteredTasks = Filter[filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTasks.sort(sortByDay);
      case SortType.PRICE:
        return filteredTasks.sort(sortByPrice);
      case SortType.TIME:
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

  init () {
    this.#renderBoard();
  }

  createEvent () {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#handleToggleNewEventButton(false);

    this.#newEventPresenter = new NewEventPresenter(this.#eventListComponent.element, this.#onNewEventClose, this.#onViewAction, this.offers, this.destinations);

    remove(this.#emptyListComponent);

    this.#isNewEventFormVisible = true;
    this.#newEventPresenter.init();
  }

  #renderEmptyEventsList () {
    if (this.events.length === 0) {
      this.#clearBoard();
      this.#emptyListComponent = new EventListEmptyView(this.#filterModel.filter);
      render(this.#emptyListComponent, this.#eventsContainer);
    }
  }

  #renderSortView () {
    this.#sortListComponent = new SortView(this.#onSortChange, this.#currentSortType);
    render(this.#sortListComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading () {
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #renderError () {
    render(this.#errorComponent, this.#eventsContainer);
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

    if (eventsCount > 0) {
      this.#renderSortView();
    }

    for (let i = 0; i < eventsCount; i++) {
      const eventPresenter = new EventPresenter(this.#eventListComponent.element, this.#onViewAction, this.#onViewModeChange, this.offers, this.destinations);
      eventPresenter.init(this.events[i]);
      this.#eventPresenters.set(this.events[i].id, eventPresenter);
    }
  }

  #clearBoard (resetSortType = false) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
    }

    remove(this.#sortListComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #onViewModeChange = () => {
    if (this.#isNewEventFormVisible) {
      this.#newEventPresenter.destroy();
      this.#handleToggleNewEventButton(true);
      this.#isNewEventFormVisible = !this.#isNewEventFormVisible;
    }
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #onSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #onViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case ActionType.ADD_TRIP:
        this.#newEventPresenter.setSaving();
        try {
          await this.#tripModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;

      case ActionType.UPDATE_TRIP:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#tripModel.updateEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;

      case ActionType.DELETE_TRIP:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#tripModel.deleteEvent(updateType, update);
        } catch(err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#handleToggleNewEventButton(true);
    this.#uiBlocker.unblock();
  };

  #onModelChange = (updateType, update) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(update.id).init(update);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true);
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderError();
        break;
    }
  };

  #onNewEventClose = () => {
    this.#isNewEventFormVisible = false;
    this.#handleToggleNewEventButton(true);
    this.#renderEmptyEventsList();
  };
}
