import Observable from '../framework/observable.js';
import { UpdateTypes } from '../constants.js';

export default class TripModel extends Observable {
  #events = [];
  #tripApiService = null;

  constructor (tripApiService) {
    super();
    this.#tripApiService = tripApiService;
  }

  async init () {
    try {
      const events = await this.#tripApiService.events;
      this.#events = events.map(this.#adaptEventToClient);
    } catch (err) {
      this.#events = [];
    }
    this._notify(UpdateTypes.INIT);
  }

  get events() {
    return this.#events;
  }

  async updateEvent (updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    try {
      const response = await this.#tripApiService.updateEvent(update);
      const updatedEvent = this.#adaptEventToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEvent);

    } catch (err) {
      throw new Error('Can\'t update event');
    }

  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent (updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptEventToClient (event) {
    const adaptedEvent = {
      ...event,
      basePrice: event.base_price,
      dateFrom: event.date_from,
      dateTo: event.date_to,
      isFavorite: event.is_favorite,
      offers: new Set(event.offers),
    };

    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

}
