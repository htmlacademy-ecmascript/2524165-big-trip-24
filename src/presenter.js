import FormAddPointView from './view/form-add-point-view.js';
import FormEditPointView from './view/form-edit-point-view.js';
import ListItemPointView from './view/point-view.js';
import ListFilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListTripEventsView from './view/list-trip-events-view.js';

import { render } from './render.js';

export default class Presenter {
  listTripEventsComponent = new ListTripEventsView();
  listFilterViewComponent = new ListFilterView();

  constructor({filterContainer, tripEventsContainer}) {
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new FormAddPointView, this.listTripEventsComponent.getElement());
    render(this.listFilterViewComponent, this.filterContainer);
    render(new SortView(), this.tripEventsContainer);
    render(this.listTripEventsComponent, this.tripEventsContainer);
    render(new FormEditPointView(), this.listTripEventsComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ListItemPointView(), this.listTripEventsComponent.getElement());
    }
  }
}
