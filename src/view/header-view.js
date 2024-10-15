import AbstractView from '../framework/view/abstract-view';

const DESTINATION_COUNT_LIMIT = 3;

function createHeaderTemplate (tripDestinations, totalPrice, dateStart, dateEnd) {
  if (tripDestinations.length < 1 || !totalPrice || !dateStart || !dateEnd) {
    return '';
  }

  const isDestinationCountLimitExceeded = tripDestinations.length > DESTINATION_COUNT_LIMIT;
  const totalPriceString = String(totalPrice);

  const titleOneDestination = `<h1 class="trip-info__title">${tripDestinations.at(0)}</h1>`;
  const titleFewDestinations = `<h1 class="trip-info__title">${tripDestinations.at(0)} &mdash; ${isDestinationCountLimitExceeded ? '...' : tripDestinations.at(1)} &mdash; ${tripDestinations.at(-1)}</h1>`;

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              ${tripDestinations.length === 1 ? titleOneDestination : titleFewDestinations}

              <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPriceString}</span>
            </p>
          </section>`;
}

export default class HeaderView extends AbstractView {
  #tripDestinations = null;
  #totalPrice = null;
  #dateStart = null;
  #dateEnd = null;

  constructor (tripDestinations, totalPrice, dateStart, dateEnd) {
    super();
    this.#tripDestinations = tripDestinations;
    this.#totalPrice = totalPrice;
    this.#dateStart = dateStart;
    this.#dateEnd = dateEnd;
  }

  get template() {
    return createHeaderTemplate(this.#tripDestinations, this.#totalPrice, this.#dateStart, this.#dateEnd);
  }

}
