import AbstractView from '../framework/view/abstract-view';

function createFilterElement(filter, isChecked) {
  const filterName = filter.type;
  const isEmpty = filter.count === 0;
  const filterLabelName = filterName.charAt(0).toUpperCase() + filterName.slice(1);

  return `<div class="trip-filters__filter">
            <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName}" ${isChecked ? 'checked' : ''} ${isEmpty ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filterName}}">${filterLabelName}</label>
          </div>`;
}

function createListFilterTemplate (filters) {
  const filterElementsArray = [];
  for (let i = 0; i < filters.length; i++) {
    const filterElement = createFilterElement(filters[i], i === 0);
    filterElementsArray.push(filterElement);
  }
  const filterElements = filterElementsArray.join('\n');
  return `<form class="trip-filters" action="#" method="get">
            ${filterElements}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class FilterListView extends AbstractView {
  #filters = [];

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filters);
  }

}
