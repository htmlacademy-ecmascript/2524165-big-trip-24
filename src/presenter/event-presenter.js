import { render, replace, remove } from '../framework/render.js';
import { ESCAPE_KEY } from '../constants.js';
import FormEditPointView from '../view/form-edit-event-view.js';
import EventPointView from '../view/event-view.js';

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

  constructor(eventContainer, onDataChange, onModeChange) {
    this.#eventContainer = eventContainer;
    this.#dataChangeHandler = onDataChange;
    this.#modeChangeHandler = onModeChange;
  }

  init (event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventPointView(event, this.#onEditButtonClick, this.#onFavoriteButtonClick);
    this.#eventEditComponent = new FormEditPointView(event, this.#onFormSubmit, this.#onCloseButtonClick);

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
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditButtonClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFavoriteButtonClick = () => {
    this.#dataChangeHandler({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #onFormSubmit = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onCloseButtonClick = () => {
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

