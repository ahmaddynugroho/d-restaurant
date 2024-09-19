import { q } from '../utils/query-selector'
import { GET_RESTAURANT_API, GET_RESTAURANT_IMAGE_API } from '../config.js'
import {
  hideLoadingElement,
  showLoadingElement
} from '../components/loading.js'

const template = /* html */ `
    <div id="jumbotron"></div>
    <h1>Explore Restaurant</h1>
    <div id="restaurant-list"></div>
  `

export const renderMainPage = async () => {
  showLoadingElement()

  const appContainer = q('#app')
  appContainer.innerHTML = template

  const restaurants = await fetchRestaurantList()
  renderJumbotron(restaurants)
  renderRestaurantList(restaurants)

  hideLoadingElement()
}

/**
 * @typedef {{
 *  id: string, name: string, pictureId: string, rating: number
 * }} Restaurant
 */

async function fetchRestaurantList () {
  /**
   * @type {{
   *  restaurants: Array<Restaurant>
   * }}
   */
  const { restaurants } = await (await fetch(GET_RESTAURANT_API)).json()
  return restaurants
}

/**
 *
 * @param {Array<Restaurant>} restaurants
 */
function renderJumbotron (restaurants) {
  /** @type {HTMLImageElement} */
  const jumbotronElement = q('#jumbotron')

  jumbotronElement.innerHTML = /* html */ `
    <picture>
      <source media="(max-width: 768px)" data-srcset="${GET_RESTAURANT_IMAGE_API}/small/${restaurants[0].pictureId} 768w">
      <source media="(max-width: 1000px)" data-srcset="${GET_RESTAURANT_IMAGE_API}/medium/${restaurants[0].pictureId} 1000w">
      <img
        data-srcset="${GET_RESTAURANT_IMAGE_API}/large/${restaurants[0].pictureId} 1200w"
        class="lazyload"
        alt="${restaurants[0].name} image"
      />
    </picture>
  `
}

/**
 *
 * @param {Array<Restaurant>} restaurants
 */
async function renderRestaurantList (restaurants) {
  const restaurantListTemplate = q('#restaurant-list')

  restaurants.forEach(r => {
    restaurantListTemplate.innerHTML += /* html */ `
    <a href="#/detail/${r.id}">
      <div id="restaurant">
        <p>${r.name}</p>
        <p>${r.rating}⭐</p>
        <picture>
          <source media="(max-width: 768px)" data-srcset="${GET_RESTAURANT_IMAGE_API}/small/${r.pictureId} 768w">
          <source media="(max-width: 1000px)" data-srcset="${GET_RESTAURANT_IMAGE_API}/medium/${r.pictureId} 1000w">
          <img
            data-srcset="${GET_RESTAURANT_IMAGE_API}/small/${r.pictureId} 1200w"
            class="lazyload"
            alt="${r.name} image"
          />
        </picture>
      </div>
    </a>
    `
  })
}
