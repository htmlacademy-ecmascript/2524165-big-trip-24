import { getOffers } from '../mock/offers.js';

export default class OffersModel {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }

}
