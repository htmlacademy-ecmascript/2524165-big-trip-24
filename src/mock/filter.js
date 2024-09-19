import { Filters } from '../utilities/filter';

function getFilters (events) {
  return Object.entries(Filters).map(([filterType, filterFunc]) => ({
    type: filterType,
    count: filterFunc(events).length,
  }));
}

export { getFilters };
