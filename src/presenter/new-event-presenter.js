import { RenderPosition, render, remove } from '../framework/render.js';
import { isEscKey } from '../utilities/util.js';
import { ActionTypes, UpdateTypes } from '../constants.js';
import FormNewEventView from '../view/form-new-event-view.js';

export default class NewEventPresenter {
  #eventContainer = null;
  #newEventComponent = null;

  #dataChangeHandler = null;
  #formTypeChangeHandler = null;
  #formDestinationChangeHandler = null;

  constructor(eventContainer, onDataChange, onFormTypeChange, onFormDestinationChange) {
    this.#eventContainer = eventContainer;
    this.#dataChangeHandler = onDataChange;
    this.#formTypeChangeHandler = onFormTypeChange;
    this.#formDestinationChangeHandler = onFormDestinationChange;
  }

  init () {
    const prevNewEventComponent = this.#newEventComponent;

    if (prevNewEventComponent === null) {
      this.#newEventComponent = new FormNewEventView(this.#onFormSubmit, this.#onFormTypeChange, this.#onFormDestinationChange, this.#onCancelButtonClick);
      render(this.#newEventComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      return;
    }

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.destroy();

  }

  destroy () {
    remove(this.#newEventComponent);
    this.#newEventComponent = null;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.destroy();
    }
  };

  #onFormSubmit = (updatedEvent) => {
    this.#dataChangeHandler(ActionTypes.ADD_TRIP, UpdateTypes.MINOR, updatedEvent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.destroy();
  };

  #onFormTypeChange = (type) => {
    const offers = this.#formTypeChangeHandler(type);
    return offers;
  };

  #onFormDestinationChange = (destinationName) => {
    const destination = this.#formDestinationChangeHandler(destinationName);
    return destination ? destination : '';
  };

  #onCancelButtonClick = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.destroy();
  };

}

