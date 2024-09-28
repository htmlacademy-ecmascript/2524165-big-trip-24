import { render } from '../framework/render';
import FilterListView from '../view/filter-list-view';

export default class FilterPresenter {
  #filtersModel = null;
  #filterContainer = null;

  constructor (filterContainer, filtersModel) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#renderFilterList();
  }

  #renderFilterList () {
    //render(new FilterListView(this.#filtersModel.filters), this.#filterContainer);
  }
}
