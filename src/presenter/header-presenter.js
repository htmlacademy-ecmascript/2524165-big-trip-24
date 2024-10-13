import { render, replace, remove } from '../framework/render';
import HeaderView from '../view/header-view';

export default class HeaderPresenter {
  #tripModel = null;
  #headerContainer = null;
  #headerComponent = null;

  constructor (headerContainer, tripModel) {
    this.#tripModel = tripModel;
    this.#headerContainer = headerContainer;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get events () {
    const events = this.#tripModel.events;
    return events;
  }

  init() {
    const events = this.events;
    const prevHeaderComponent = this.#headerComponent;

    this.#headerComponent = new HeaderView(events);

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#headerContainer);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

}
