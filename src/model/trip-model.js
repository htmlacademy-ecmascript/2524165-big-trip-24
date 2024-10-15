import Observable from '../framework/observable.js';
import { UpdateTypes } from '../constants.js';

export default class TripModel extends Observable {
  #events = [];
  #tripApiService = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor (tripApiService, offersModel, destinationsModel) {
    super();
    this.#tripApiService = tripApiService;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get events() {
    return this.#events;
  }

  async init () {
    try {
      await Promise.all([this.#offersModel.init(), this.#destinationsModel.init()]);
      const events = await this.#tripApiService.events;
      this.#events = events.map(this.#adaptEventToClient);
      this._notify(UpdateTypes.INIT);
    } catch (err) {
      this.#events = [];
      this._notify(UpdateTypes.ERROR);
    }
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

  async addEvent(updateType, update) {
    try {
      const response = await this.#tripApiService.addEvent(update);
      const newEvent = this.#adaptEventToClient(response);
      this.#events = [
        newEvent,
        ...this.#events,
      ];

      this._notify(updateType, update);

    } catch (err) {
      throw new Error('Can\'t add new event');
    }
  }

  async deleteEvent (updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    try {
      await this.#tripApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType);

    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptEventToClient (event) {
    const adaptedEvent = {
      ...event,
      basePrice: event.base_price,
      dateFrom: new Date(event.date_from),
      dateTo: new Date(event.date_to),
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
