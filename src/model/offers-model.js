export default class OffersModel {
  #offers = [];
  #tripApiService = null;

  constructor (tripApiService) {
    this.#tripApiService = tripApiService;
  }

  get offers () {
    return this.#offers;
  }

  async init () {
    try {
      const offers = await this.#tripApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
    }
  }

}
