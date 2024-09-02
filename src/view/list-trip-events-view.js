import { createElement } from '../render';

function createListTripEventsTemplate () {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListTripEventsView {
  getTemplate() {
    return createListTripEventsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
