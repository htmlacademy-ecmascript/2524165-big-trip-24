import AbstractView from '../framework/view/abstract-view';

function createFilterElement(filter, currentFilterType) {
  const filterType = filter.type;
  const isEmpty = filter.count === 0;
  const filterLabelName = filterType.charAt(0).toUpperCase() + filterType.slice(1);

  return `<div class="trip-filters__filter">
            <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${filterType === currentFilterType ? 'checked' : ''} ${isEmpty ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filterType}">${filterLabelName}</label>
          </div>`;
}

function createFilterListTemplate (filters, currentFilterType) {
  const filterElementsArray = [];
  for (let i = 0; i < filters.length; i++) {
    const filterElement = createFilterElement(filters[i], currentFilterType);
    filterElementsArray.push(filterElement);
  }
  const filterElements = filterElementsArray.join('\n');
  return `<form class="trip-filters" action="#" method="get">
            ${filterElements}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor (filters, currentFilterType, onFilterTypeChange) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterListTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
