import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const DataType = {
  EVENTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

export default class TripApiService extends ApiService {
  get events () {
    return this.#loadDataByType(DataType.EVENTS);
  }

  get offers () {
    return this.#loadDataByType(DataType.OFFERS);
  }

  get destinations () {
    return this.#loadDataByType(DataType.DESTINATIONS);
  }

  async updateEvent (event) {
    const response = await this._load({
      url: `${DataType.EVENTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptEventForServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent (event) {
    const response = await this._load({
      url: `${DataType.EVENTS}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptEventForServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent (event) {
    const response = await this._load({
      url: `${DataType.EVENTS}/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptEventForServer (event) {
    const adaptedEvent = {
      ...event,
      /* eslint-disable */
      date_from: event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      date_to: event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      base_price: event.basePrice,
      is_favorite: event.isFavorite,
      /* eslint-enable */
      offers: Array.from(event.offers),
    };

    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.basePrice;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }

  #loadDataByType (type) {
    return this._load({url: type})
      .then(ApiService.parseResponse);
  }
}
