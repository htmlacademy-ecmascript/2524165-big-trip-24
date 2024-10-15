import { render, replace, remove } from '../framework/render';
import { Filter } from '../utilities/filter';
import { UpdateType } from '../constants';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #tripModel = null;
  #filterModel = null;
  #filterContainer = null;
  #filterComponent = null;

  constructor (filterContainer, filtersModel, tripModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filtersModel;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get filters () {
    const events = this.#tripModel.events;
    return Object.entries(Filter).map(([filterType, filterFunc]) => ({
      type: filterType,
      count: filterFunc(events).length,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter, this.#onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #onModelEvent = () => {
    this.init();
  };

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
