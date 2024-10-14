import AbstractView from '../framework/view/abstract-view';

function createAddEventButtonTemplate(isDisabled) {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled ? 'disabled' : ''}>New event</button>`;
}

export default class AddEventButtonView extends AbstractView {
  #handleClick = null;
  #isDisabled = true;

  constructor (onClick) {
    super();
    this.#handleClick = onClick;
  }

  init () {
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template () {
    return createAddEventButtonTemplate(this.#isDisabled);
  }

  setEnabled () {
    this.#isDisabled = false;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
