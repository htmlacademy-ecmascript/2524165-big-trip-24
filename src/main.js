import Presenter from './presenter/presenter.js';
import TripModel from './model/model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const tripModel = new TripModel();

const presenter = new Presenter(filterContainerElement, tripEventsContainerElement, tripModel);
presenter.init();
