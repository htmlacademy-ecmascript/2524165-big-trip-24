import { render, replace, remove } from '../framework/render.js';
import { isEscKey } from '../utilities/util.js';
import FormEditPointView from '../view/form-edit-event-view.js';
import EventPointView from '../view/event-view.js';
import { ActionTypes, UpdateTypes } from '../constants.js';

export default class NewEventPresenter {
  #event = null;
  #eventContainer = null;
  #newEventComponent = null;

  #mode = Mode.DEFAULT;
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
    //this.#event = event;

    // const prevEventComponent = this.#eventComponent;
    // const prevEventEditComponent = this.#eventEditComponent;

    this.#newEventComponent = new NewPointView(this.#event, this.#onFormSubmit, this.#onCloseButtonClick, this.#onFormTypeChange, this.#onFormDestinationChange, this.#onDeleteButtonClick);

    //if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#newEventComponent, this.#eventContainer);
      //return;
    //}


    // remove(prevEventComponent);
    // remove(prevEventEditComponent);

    //}
  }

  destroy () {
    remove(this.#newEventComponent);
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
    
  };

  #onCloseButtonClick = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

}

