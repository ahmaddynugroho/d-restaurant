import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";

const BASE_API = "https://restaurant-api.dicoding.dev";
const GET_RESTAURANT_API = `${BASE_API}/list`;
const GET_RESTAURANT_IMAGE_API = `${BASE_API}/images`;

/** @param {string} query */
const q = (query) => document.querySelector(query);
/** @param {string} query */
const qa = (query) => document.querySelectorAll(query);

/** @type {HTMLButtonElement} */
const showNavMenuButton = q("#show-menu");
/** @type {NodeListOf<HTMLAnchorElement>} */
const navLinks = qa("nav a");
showNavMenuButton.addEventListener("click", (e) => {
  navLinks.forEach((e) => {
    const currentDisplay = e.style.display;
    e.style.display =
      currentDisplay === "inline-block" ? "none" : "inline-block";
  });
});

async function getRestaurantList() {
  /**
   * @type {{
   *  restaurants: Array<{name: string, pictureId: string, rating: number}>
   * }}
   */
  const { restaurants } = await (await fetch(GET_RESTAURANT_API)).json();

  /** @type {HTMLDivElement} */ const loadingElement = q("#loading");
  /** @type {HTMLImageElement} */ const jumbotronElement = q("#jumbotron");
  const restaurantListTemplate = q("#restaurant-list");

  loadingElement.style.display = "none";

  jumbotronElement.src = `${GET_RESTAURANT_IMAGE_API}/small/${restaurants[0].pictureId}`;
  jumbotronElement.alt = `${restaurants[0].name} image`;
  jumbotronElement.style.display = "block";

  restaurants.forEach((r) => {
    restaurantListTemplate.innerHTML += /*html*/ `
      <div id="restaurant">
        <p>${r.name}</p>
        <p>${r.rating}⭐</p>
        <img src="${GET_RESTAURANT_IMAGE_API}/small/${r.pictureId}" alt="${r.name} image">
      </div>
    `;
  });
}

getRestaurantList();
