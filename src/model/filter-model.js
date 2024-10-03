import Observable from '../framework/observable.js';
import { FilterTypes } from '../constants.js';

export default class FilterModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter (updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }

}
