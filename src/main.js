import Presenter from './presenter';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const presenter = new Presenter({filterContainer: filterContainerElement, tripEventsContainer: tripEventsContainerElement});
presenter.init();
