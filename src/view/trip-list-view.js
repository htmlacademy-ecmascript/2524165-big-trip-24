import AbstractView from '../framework/view/abstract-view';

function createTripEventsListTemplate () {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripListView extends AbstractView {
  get template() {
    return createTripEventsListTemplate();
  }

}
