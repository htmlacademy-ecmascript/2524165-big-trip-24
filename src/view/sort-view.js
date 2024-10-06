import AbstractView from '../framework/view/abstract-view';
import { SortTypes } from '../constants';

function createSortItemTemplate (sortType, currentSortType, isSortItemDisabled = false) {
  const sortItemName = sortType.at(0).toUpperCase() + sortType.slice(1);
  const isDisabled = isSortItemDisabled ? 'disabled' : '';
  const isChecked = sortType === currentSortType ? 'checked' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sortType}">
            <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" data-sort-type="${sortType}" ${isChecked} ${isDisabled}>
            <label class="trip-sort__btn" for="sort-${sortType}">${sortItemName}</label>
          </div>`;
}

function createListSortTemplate (currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortItemTemplate(SortTypes.DAY, currentSortType)}
            ${createSortItemTemplate('event', currentSortType, true)}
            ${createSortItemTemplate(SortTypes.TIME, currentSortType)}
            ${createSortItemTemplate(SortTypes.PRICE, currentSortType)}
            ${createSortItemTemplate('offers', currentSortType, true)}
          </form>`;
}

export default class SortListView extends AbstractView {
  #handleSortButtonClick = null;
  #currentSortType = SortTypes.DAY;

  constructor (onSortButtonClick, currentSortType) {
    super();
    this.#handleSortButtonClick = onSortButtonClick;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('change', this.#sortButtonClickHandler);
  }

  get template() {
    return createListSortTemplate(this.#currentSortType);
  }

  #sortButtonClickHandler = (evt) => {
    this.#handleSortButtonClick(evt.target.dataset.sortType);
  };

}
