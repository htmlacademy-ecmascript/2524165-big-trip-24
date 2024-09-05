import FormAddPointView from '../view/form-add-point-view.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import ListItemPointView from '../view/point-view.js';
import ListFilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListTripEventsView from '../view/list-trip-events-view.js';

import { render } from '../render.js';

const LIST_ITEM_POINT_VIEW_COUNT = 5;

export default class Presenter {
  listTripEventsComponent = new ListTripEventsView();
  listFilterViewComponent = new ListFilterView();

  constructor(filterContainer, tripEventsContainer, tripsModel) {
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.tripsModel = tripsModel;
  }

  init() {
    this.trips = this.tripsModel.getTrips();
    render(new FormAddPointView, this.listTripEventsComponent.getElement());
    render(this.listFilterViewComponent, this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.listTripEventsComponent, this.tripEventsContainer);
    render(new FormEditPointView(this.trips[0]), this.listTripEventsComponent.getElement());

    for (let i = 1; i < LIST_ITEM_POINT_VIEW_COUNT; i++) {
      render(new ListItemPointView(this.trips[i]), this.listTripEventsComponent.getElement());
    }
  }
}
