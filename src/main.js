import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripModel from './model/trip-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';
import AddEventButtonView from './view/add-event-button-view.js';
import { render } from './framework/render.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const addEventButtonContainerElement = document.querySelector('.trip-main');
const filtersModel = new FiltersModel();
const tripModel = new TripModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const addEventButtonComponent = new AddEventButtonView(handleAddEventButtonClick);

const filterPresenter = new FilterPresenter(filterContainerElement, filtersModel);
const boardPresenter = new BoardPresenter(tripEventsContainerElement, tripModel, offersModel, destinationsModel, handleAddEventFormClose);
filterPresenter.init();
boardPresenter.init();

render(addEventButtonComponent, addEventButtonContainerElement);

function handleAddEventFormClose() {
  addEventButtonComponent.element.disabled = false;
}

function handleAddEventButtonClick() {
  boardPresenter.createEvent();
  addEventButtonComponent.element.disabled = true;
}
