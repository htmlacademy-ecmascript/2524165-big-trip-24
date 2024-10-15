import { RenderPosition, render, remove } from '../framework/render.js';
import { isEscKey } from '../utilities/util.js';
import { ActionType, UpdateType } from '../constants.js';
import FormNewEventView from '../view/form-new-event-view.js';

export default class NewEventPresenter {
  #offers = null;
  #destinations = null;
  #eventContainer = null;
  #newEventComponent = null;

  #dataChangeHandler = null;
  #newEventCloseHandler = null;

  constructor(eventContainer, offers, destinations, onNewEventClose, onDataChange) {
    this.#eventContainer = eventContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#newEventCloseHandler = onNewEventClose;
    this.#dataChangeHandler = onDataChange;
  }

  init () {
    const prevNewEventComponent = this.#newEventComponent;

    if (prevNewEventComponent === null) {
      this.#newEventComponent = new FormNewEventView(this.#onFormSubmit, this.#onCancelButtonClick, this.#offers, this.#destinations, this);
      render(this.#newEventComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);

      document.addEventListener('keydown', this.#onEscKeyDown);
      return;
    }

    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.destroy();

  }

  destroy () {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this.#newEventComponent);
    this.#newEventComponent = null;
  }

  setSaving () {
    this.#newEventComponent.updateElement({isSaving: true, isDisabled: true});
  }

  setAborting () {
    const resetStateMode = () => {
      this.#newEventComponent.updateElement({isSaving: false, isDisabled: false});
    };

    this.#newEventComponent.shake(resetStateMode);
  }

  #onEscKeyDown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#newEventCloseHandler();
      this.destroy();
    }
  };

  #onFormSubmit = (updatedEvent) => {
    this.#dataChangeHandler(ActionType.ADD_TRIP, UpdateType.MINOR, updatedEvent);
  };

  #onCancelButtonClick = () => {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#newEventCloseHandler();
    this.destroy();
  };

}

