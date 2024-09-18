import { q } from '../utils/query-selector'
import { GET_RESTAURANT_API, GET_RESTAURANT_IMAGE_API } from '../config.js'
import {
  hideLoadingElement,
  showLoadingElement
} from '../components/loading.js'

const template = /* html */ `
    <img id="jumbotron" style="margin-bottom: 1rem; display: none" />
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

  jumbotronElement.src = `${GET_RESTAURANT_IMAGE_API}/small/${restaurants[0].pictureId}`
  jumbotronElement.alt = `${restaurants[0].name} image`
  jumbotronElement.style.display = 'block'
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
        <img src="${GET_RESTAURANT_IMAGE_API}/small/${r.pictureId}" alt="${r.name} image">
      </div>
    </a>
    `
  })
}
