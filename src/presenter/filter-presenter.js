import { render, replace, remove } from '../framework/render';
import FilterView from '../view/filter-view';
import { Filters } from '../utilities/filter';
import { UpdateTypes } from '../constants';

export default class FilterPresenter {
  #tripModel = null;
  #filterModel = null;
  #filterContainer = null;
  #filterComponent = null;

  constructor (filterContainer, filtersModel, tripModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filtersModel;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters () {
    const events = this.#tripModel.events;

    return Object.entries(Filters).map(([filterType, filterFunc]) => ({
      type: filterType,
      count: filterFunc(events).length,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter, this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  };

}
