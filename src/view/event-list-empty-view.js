import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../constants';

function createEventListEmptyTemplate (filterType) {
  let emptyListMessage = null;
  switch (filterType) {
    case FilterType.EVERYTHING:
      emptyListMessage = 'Click New Event to create your first point';
      break;
    case FilterType.FUTURE:
      emptyListMessage = 'There are no future events now';
      break;
    case FilterType.PAST:
      emptyListMessage = 'There are no past events now';
      break;
    case FilterType.PRESENT:
      emptyListMessage = 'There are no present events now';
      break;
    default:
      break;
  }

  return `<p class="trip-events__msg">${emptyListMessage}</p>`;
}

export default class EventListEmptyView extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEventListEmptyTemplate(this.#filterType);
  }

}
