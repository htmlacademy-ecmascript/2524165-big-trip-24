import BoardPresenter from './presenter/board-presenter.js';
import TripModel from './model/trip-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const tripModel = new TripModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const presenter = new BoardPresenter(filterContainerElement, tripEventsContainerElement, tripModel, offersModel, destinationsModel);
presenter.init();
