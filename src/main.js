import BoardPresenter from './presenter/board-presenter.js';
import TripModel from './model/model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');
const tripModel = new TripModel();

const presenter = new BoardPresenter(filterContainerElement, tripEventsContainerElement, tripModel);
presenter.init();
