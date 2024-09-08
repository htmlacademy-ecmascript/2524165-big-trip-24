import FormEditPointView from '../view/form-edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import FilterListView from '../view/filter-list-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';

import { render, replace } from '../framework/render.js';

const LIST_ITEM_POINT_VIEW_COUNT = 5;

export default class Presenter {
  #tripListComponent = new TripListView();
  #filterListComponent = new FilterListView();
  #filterContainer = null;
  #tripEventsContainer = null;
  #tripModel = null;
  #trips = [];

  constructor(filterContainer, tripEventsContainer, tripModel) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#trips = this.#tripModel.trips;
    render(this.#filterListComponent, this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripListComponent, this.#tripEventsContainer);

    for (let i = 0; i < LIST_ITEM_POINT_VIEW_COUNT; i++) {
      this.#renderTrip(this.#trips[i]);
    }
  }

  #renderTrip(trip) {
    const tripComponent = new TripPointView(trip, onEditButtonClick);
    const tripEditComponent = new FormEditPointView(trip, onFormSubmit, onCloseButtonClick);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToTrip();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function onEditButtonClick() {
      replaceTripToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function onFormSubmit() {
      replaceFormToTrip();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function onCloseButtonClick() {
      replaceFormToTrip();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function replaceTripToForm() {
      replace(tripEditComponent, tripComponent);
    }

    function replaceFormToTrip() {
      replace(tripComponent, tripEditComponent);
    }

    render(tripComponent, this.#tripListComponent.element);
  }
}
