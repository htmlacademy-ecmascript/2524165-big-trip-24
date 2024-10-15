export default class DestinationsModel {
  #destinations = [];
  #tripApiService = null;

  constructor (tripApiService) {
    this.#tripApiService = tripApiService;
  }

  async init () {
    try {
      const destinations = await this.#tripApiService.destinations;
      this.#destinations = destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }

  get destinations () {
    return this.#destinations;
  }

}
