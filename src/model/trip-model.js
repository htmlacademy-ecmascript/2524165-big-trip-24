import { getEvents } from '../mock/trip.js';
import Observable from '../framework/observable.js';

export default class TripModel extends Observable {
  #events = getEvents();

  get events() {
    return this.#events;
  }

  updateEvent(updateType, update) {
    // const index = this.#events.findIndex((task) => task.id === update.id);

    // if (index === -1) {
    //   throw new Error('Can\'t update unexisting task');
    // }

    this.#events = this.#events.map((event) => event.id === update.id ? update : event);

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    // if (index === -1) {
    //   throw new Error('Can\'t delete unexisting task');
    // }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
