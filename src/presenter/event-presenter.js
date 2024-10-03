import { render, replace, remove } from '../framework/render.js';
import { isEscKey } from '../utilities/util.js';
import FormEditPointView from '../view/form-edit-event-view.js';
import EventPointView from '../view/event-view.js';
import { ActionTypes, UpdateTypes } from '../constants.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #event = null;
  #eventContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;

  #mode = Mode.DEFAULT;
  #dataChangeHandler = null;
  #modeChangeHandler = null;
  #formTypeChangeHandler = null;
  #formDestinationChangeHandler = null;

  constructor(eventContainer, onDataChange, onModeChange, onFormTypeChange, onFormDestinationChange) {
    this.#eventContainer = eventContainer;
    this.#dataChangeHandler = onDataChange;
    this.#modeChangeHandler = onModeChange;
    this.#formTypeChangeHandler = onFormTypeChange;
    this.#formDestinationChangeHandler = onFormDestinationChange;
  }

  init (event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventPointView(this.#event, this.#onEditButtonClick, this.#onFavoriteButtonClick);
    this.#eventEditComponent = new FormEditPointView(this.#event, this.#onFormSubmit, this.#onCloseButtonClick, this.#onFormTypeChange, this.#onFormDestinationChange, this.#onDeleteButtonClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace (this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace (this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);

  }

  resetView () {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  destroy () {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditButtonClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFavoriteButtonClick = () => {
    const updatedEvent = {...this.#event, isFavorite: !this.#event.isFavorite};
    this.#dataChangeHandler(ActionTypes.UPDATE_TRIP, UpdateTypes.PATCH, updatedEvent);
  };

  #onFormSubmit = (updatedEvent) => {
    this.#dataChangeHandler(ActionTypes.UPDATE_TRIP, UpdateTypes.MINOR, updatedEvent);
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFormTypeChange = (type) => {
    const offers = this.#formTypeChangeHandler(type);
    return offers;
  };

  #onFormDestinationChange = (destinationName) => {
    const destination = this.#formDestinationChangeHandler(destinationName);
    return destination ? destination : '';
  };

  #onDeleteButtonClick = () => {
    this.#dataChangeHandler(ActionTypes.DELETE_TRIP, UpdateTypes.MINOR, this.#event);
  };

  #onCloseButtonClick = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEventToForm () {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#modeChangeHandler();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToEvent () {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
  }

}

