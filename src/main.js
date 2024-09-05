import Presenter from './presenter/presenter.js';
import TripsModel from './model/model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const tripsModel = new TripsModel();

const presenter = new Presenter(filterContainerElement, tripEventsContainerElement, tripsModel);
presenter.init();
