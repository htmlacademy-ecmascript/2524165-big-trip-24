import { RenderPosition, render, remove } from '../framework/render.js';
import { isEscKey } from '../utilities/util.js';
import { ActionTypes, UpdateTypes } from '../constants.js';
import FormNewEventView from '../view/form-new-event-view.js';
import { nanoid } from 'nanoid';

export default class NewEventPresenter {
  #offers = null;
  #destinations = null;
  #eventContainer = null;
  #newEventComponent = null;

  #dataChangeHandler = null;

  constructor(eventContainer, onDataChange, offers, destinations) {
    this.#eventContainer = eventContainer;
    this.#dataChangeHandler = onDataChange;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init () {
    const prevNewEventComponent = this.#newEventComponent;

    if (prevNewEventComponent === null) {
      this.#newEventComponent = new FormNewEventView(this.#onFormSubmit, this.#onCancelButtonClick, this.#offers, this.#destinations);
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
    this.#dataChangeHandler(ActionTypes.ADD_TRIP, UpdateTypes.MINOR, {id: nanoid(), ...updatedEvent});
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.destroy();
  };

  #onCancelButtonClick = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.destroy();
  };

}

