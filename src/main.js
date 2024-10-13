import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripModel from './model/trip-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripApiService from './trip-api-service.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic oe0w550dk29289a';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const headerContainerElement = document.querySelector('.trip-main');
const newEventButtonContainerElement = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const tripModel = new TripModel(tripApiService);
const offersModel = new OffersModel(tripApiService);
const destinationsModel = new DestinationsModel(tripApiService);
const newEventButtonComponent = new NewEventButtonView(handleNewEventButtonClick);

const filterPresenter = new FilterPresenter(filterContainerElement, filterModel, tripModel);
const boardPresenter = new BoardPresenter(tripEventsContainerElement, tripModel, filterModel, offersModel, destinationsModel);
const headerPresenter = new HeaderPresenter(headerContainerElement, tripModel, offersModel, destinationsModel);

filterPresenter.init();
boardPresenter.init();

Promise.all([offersModel.init(), destinationsModel.init()]).then(() => {
  tripModel.init().finally(() => {
    render(newEventButtonComponent, newEventButtonContainerElement);
    headerPresenter.init();
  });
});

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
}
