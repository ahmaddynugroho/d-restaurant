import { hideLoadingElement, showLoadingElement } from "../components/loading";
import { GET_RESTAURANT_IMAGE_API } from "../config";
import { getAllRestaurant } from "../utils/indexeddb";
import { q } from "../utils/query-selector";

export async function renderFavoritePage() {
  showLoadingElement()
  
  const appContainer = q('#app')
  appContainer.innerHTML = /* html */ `
    <h1>Favorite Restaurant</h1>
    <div id="restaurant-list"></div>
`
  const restaurantContainer = q('#restaurant-list')
  const restaurants = await getAllRestaurant()
  renderRestaurantList(restaurantContainer, restaurants)

  hideLoadingElement()
}

function renderRestaurantList (appContainer, restaurants) {
  restaurants.forEach(r => {
    appContainer.innerHTML += /* html */ `
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