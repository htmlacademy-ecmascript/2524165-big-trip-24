import AbstractView from '../framework/view/abstract-view';

function createAddEventButtonTemplate(isEnabled) {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isEnabled ? '' : 'disabled'}>New event</button>`;
}

export default class AddEventButtonView extends AbstractView {
  #handleClick = null;
  #isEnabled = false;

  constructor (onClick) {
    super();
    this.#handleClick = onClick;
  }

  init () {
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template () {
    return createAddEventButtonTemplate(this.#isEnabled);
  }

  toggleButton (isEnabled) {
    this.#isEnabled = isEnabled;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
