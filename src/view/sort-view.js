import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../constants';

function createSortItemTemplate (sortType, currentSortType, isSortItemDisabled = false) {
  const sortItemName = sortType.at(0).toUpperCase() + sortType.slice(1);
  const isDisabled = isSortItemDisabled ? 'disabled' : '';
  const isChecked = sortType === currentSortType ? 'checked' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sortType}">
            <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" data-sort-type="${sortType}" ${isChecked} ${isDisabled}>
            <label class="trip-sort__btn" for="sort-${sortType}">${sortItemName}</label>
          </div>`;
}

function createSortTemplate (currentSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortItemTemplate(SortType.DAY, currentSortType)}
            ${createSortItemTemplate('event', currentSortType, true)}
            ${createSortItemTemplate(SortType.TIME, currentSortType)}
            ${createSortItemTemplate(SortType.PRICE, currentSortType)}
            ${createSortItemTemplate('offers', currentSortType, true)}
          </form>`;
}

export default class SortView extends AbstractView {
  #handleSortButtonClick = null;
  #currentSortType = SortType.DAY;

  constructor (onSortButtonClick, currentSortType) {
    super();
    this.#handleSortButtonClick = onSortButtonClick;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('change', this.#onSortButtonClick);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #onSortButtonClick = (evt) => {
    this.#handleSortButtonClick(evt.target.dataset.sortType);
  };

}
