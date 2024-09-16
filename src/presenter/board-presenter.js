import { render } from '../framework/render.js';
import { updateTrip } from '../utilities/trip.js';
import FilterListView from '../view/filter-list-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import TripPresenter from './trip-presenter.js';

export default class BoardPresenter {
  #filterContainer = null;
  #filters = [];
  #tripEventsContainer = null;
  #tripListComponent = new TripListView();
  #tripModel = null;
  #trips = [];
  #tripPresenters = new Map();

  constructor(filterContainer, tripEventsContainer, tripModel) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#trips = this.#tripModel.trips;
    this.#filters = this.#tripModel.filters;

    this.#renderFilterList();
    if (this.#trips.length === 0) {
      this.#renderEmptyTripList();
      return;
    }
    this.#renderSortView();
    this.#renderTrips();
  }

  #renderFilterList () {
    render(new FilterListView(this.#filters), this.#filterContainer);
  }

  #renderEmptyTripList () {
    render(new TripListEmptyView(), this.#tripEventsContainer);
  }

  #renderSortView () {
    render(new SortView(), this.#tripEventsContainer);
  }

  #renderTrips () {
    render(this.#tripListComponent, this.#tripEventsContainer);

    const tripsCount = this.#trips.length;
    for (let i = 0; i < tripsCount; i++) {
      const tripPresenter = new TripPresenter(this.#tripListComponent.element, this.#dataChangeHandler, this.#handleModeChange);
      tripPresenter.init(this.#trips[i]);
      this.#tripPresenters.set(this.#trips[i].id, tripPresenter);
    }
  }

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #dataChangeHandler = (updatedTrip) => {
    updateTrip(this.#trips, updatedTrip);
    this.#tripPresenters.get(updatedTrip.id).init(updatedTrip);
  };

}
