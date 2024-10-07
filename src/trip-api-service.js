import ApiService from './framework/api-service';

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
};

const DataTypes = {
  EVENTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

export default class TripApiService extends ApiService {
  get events () {
    return this.#loadDataByType(DataTypes.EVENTS);
  }

  get offers () {
    return this.#loadDataByType(DataTypes.OFFERS);
  }

  get destinations () {
    return this.#loadDataByType(DataTypes.DESTINATIONS);
  }

  #loadDataByType (type) {
    return this._load({url: type})
      .then(ApiService.parseResponse);
  }

  async updateEvent (event) {
    const response = await this._load({
      url: `${DataTypes.EVENTS}/${event.id}`,
      method: Methods.PUT,
      body: JSON.stringify(this.#adaptEventForServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptEventForServer (event) {
    const adaptedEvent = {
      ...event,
      /* eslint-disable */
      date_from: event.dateFrom,// instanceof Date ? event.dateFrom.toISOString() : null,
      date_to: event.dateTo,// instanceof Date ? event.dateTo.toISOString() : null,
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
}
