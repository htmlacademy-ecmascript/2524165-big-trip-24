import { Filters } from '../utilities/filter';

function getFilters (trips) {
  return Object.entries(Filters).map(([filterType, filterFunc]) => ({
    type: filterType,
    count: filterFunc(trips).length,
  }));
}

export { getFilters };
