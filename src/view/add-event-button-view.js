import AbstractView from '../framework/view/abstract-view';

function createAddEventButtonTemplate() {
  return '<button class="control__button">+ ADD NEW TASK</button>';
}

export default class AddEventButtonView extends AbstractView {
  #handleClick = null;

  constructor(onClick) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createAddEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
