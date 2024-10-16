export default class DestinationsModel {
  #destinations = [];
  #tripApiService = null;

  constructor (tripApiService) {
    this.#tripApiService = tripApiService;
  }

  get destinations () {
    return this.#destinations;
  }

  async init () {
    try {
      const destinations = await this.#tripApiService.destinations;
      this.#destinations = destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }

}
