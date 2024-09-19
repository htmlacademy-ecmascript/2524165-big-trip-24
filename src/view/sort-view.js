import AbstractView from '../framework/view/abstract-view';
import { SortTypes } from '../constants';

function createListSortTemplate () {
  const sortDayLabelName = SortTypes.DAY.at(0).toUpperCase() + SortTypes.DAY.slice(1);
  const sortTimeLabelName = SortTypes.TIME.at(0).toUpperCase() + SortTypes.TIME.slice(1);
  const sortPriceLabelName = SortTypes.PRICE.at(0).toUpperCase() + SortTypes.PRICE.slice(1);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--${SortTypes.DAY}">
              <input id="sort-${SortTypes.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortTypes.DAY}" data-sort-type="${SortTypes.DAY}" checked>
              <label class="trip-sort__btn" for="sort-${SortTypes.DAY}">${sortDayLabelName}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortTypes.TIME}">
              <input id="sort-${SortTypes.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortTypes.TIME}" data-sort-type="${SortTypes.TIME}">
              <label class="trip-sort__btn" for="sort-${SortTypes.TIME}">${sortTimeLabelName}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortTypes.PRICE}">
              <input id="sort-${SortTypes.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortTypes.PRICE}" data-sort-type="${SortTypes.PRICE}">
              <label class="trip-sort__btn" for="sort-${SortTypes.PRICE}">${sortPriceLabelName}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
}

export default class SortListView extends AbstractView {
  #handleSortButtonClick = null;

  constructor (onSortButtonClick) {
    super();
    this.#handleSortButtonClick = onSortButtonClick;
    this.element.addEventListener('change', this.#sortButtonClickHandler);
  }

  get template() {
    return createListSortTemplate();
  }

  #sortButtonClickHandler = (evt) => {
    this.#handleSortButtonClick(evt.target.dataset.sortType);
  };

}
