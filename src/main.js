import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripModel from './model/trip-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const newEventButtonContainerElement = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const tripModel = new TripModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const newEventButtonComponent = new NewEventButtonView(handleNewEventButtonClick);

const filterPresenter = new FilterPresenter(filterContainerElement, filterModel, tripModel);
const boardPresenter = new BoardPresenter(tripEventsContainerElement, tripModel, filterModel, offersModel, destinationsModel);
filterPresenter.init();
boardPresenter.init();

render(newEventButtonComponent, newEventButtonContainerElement);

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
}
