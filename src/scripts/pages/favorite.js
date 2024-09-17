import { showLoadingElement } from "../components/loading";
import { getAllRestaurant } from "../utils/indexeddb";
import { q } from "../utils/query-selector";

export async function renderFavoritePage() {
  showLoadingElement()
  
  const appContainer = q('#app')
  console.log(await getAllRestaurant());
  
}