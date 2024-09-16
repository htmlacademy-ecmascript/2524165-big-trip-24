import { render, replace, remove } from '../framework/render';
import FormEditPointView from '../view/form-edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #trip = null;
  #tripContainer = null;
  #tripComponent = null;
  #tripEditComponent = null;

  #mode = Mode.DEFAULT;
  #dataChangeHandler = null;
  #modeChangeHandler = null;

  constructor(tripContainer, onDataChange, onModeChange) {
    this.#tripContainer = tripContainer;
    this.#dataChangeHandler = onDataChange;
    this.#modeChangeHandler = onModeChange;
  }

  init (trip) {
    this.#trip = trip;

    const prevTripComponent = this.#tripComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripComponent = new TripPointView(trip, this.#onEditButtonClick, this.#onFavoriteButtonClick);
    this.#tripEditComponent = new FormEditPointView(trip, this.#onFormSubmit, this.#onCloseButtonClick);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this.#tripComponent, this.#tripContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace (this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace (this.#tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);

  }

  resetView () {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToTrip();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToTrip();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditButtonClick = () => {
    this.#replaceTripToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFavoriteButtonClick = () => {
    this.#dataChangeHandler({...this.#trip, isFavorite: !this.#trip.isFavorite});
  };

  #onFormSubmit = () => {
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onCloseButtonClick = () => {
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceTripToForm () {
    replace(this.#tripEditComponent, this.#tripComponent);
    this.#modeChangeHandler();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToTrip () {
    replace(this.#tripComponent, this.#tripEditComponent);
    this.#mode = Mode.DEFAULT;
  }

}

