import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate(isEnabled) {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isEnabled ? '' : 'disabled'}>New event</button>`;
}

export default class NewEventButtonView extends AbstractView {
  #handleClick = null;
  #isEnabled = false;

  constructor (onButtonClick) {
    super();
    this.#handleClick = onButtonClick;
  }

  get template () {
    return createNewEventButtonTemplate(this.#isEnabled);
  }

  init () {
    this.element.addEventListener('click', this.#onButtonClick);
  }

  toggleButton (isEnabled) {
    this.#isEnabled = isEnabled;
  }

  #onButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
