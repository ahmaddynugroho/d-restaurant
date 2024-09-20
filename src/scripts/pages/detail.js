import { hideLoadingElement, showLoadingElement } from '../components/loading'
import { GET_RESTAURANT_DETAIL_API, GET_RESTAURANT_IMAGE_API } from '../config'
import { FavoriteDB, initFavoriteButton } from '../utils/indexeddb'
import { q } from '../utils/query-selector'

const template = restaurant => /* html */ `
  <h1>${restaurant.name} (${restaurant.rating}⭐)</h1>
  <button id="add-or-remove-fav">fav button</button>
  <img
    src="${GET_RESTAURANT_IMAGE_API}/large/${restaurant.pictureId}"
    alt="${restaurant.name} image"
  />
  <p>City: ${restaurant.city}</p>
  <p>Address: ${restaurant.address}</p>
  <p>Description: ${restaurant.description}</p>
  <p>Categories: ${restaurant.categories.map(v => v.name).join(', ')}</p>
  <h1>Menu Minuman</h1>
  <ul>
    ${restaurant.menus.drinks.map(v => '<li>' + v.name + '</li>').join('')}
  </ul>
  <h1>Menu Makanan</h1>
  <ul>
    ${restaurant.menus.foods.map(v => '<li>' + v.name + '</li>').join('')}
  </ul>
  <h1>Review</h1>
  <ul>
    ${restaurant.customerReviews
      .map(v => `<li>${v.name}: ${v.review} (${v.date})</li>`)
      .join('')}
  </ul>
`

// TODO: refactor this page and favorite page
class FavoriteButton {
  constructor (args) {
    const { detail, buttonId, db } = args
    this._btn = document.querySelector(buttonId)
    this._db = db
    this._detail = detail
  }

  async initButton () {
    this._renderButtonText()
    this._btn.addEventListener('click', async () => {
      await this._click()
      this._renderButtonText()
    })
  }

  async _renderButtonText () {
    this._btn.innerHTML = (await this.isFavorite())
      ? 'Remove from favorite'
      : 'Add to favorite'
  }

  isFavorite () {
    return this._db.get(this._detail.id)
  }

  async _click () {
    if (await this.isFavorite()) {
      await this._db.delete(this._detail.id)
    } else {
      await this._db.add(this._detail)
    }
  }
}

export async function renderDetailPage (id) {
  showLoadingElement()

  const appContainer = q('#app')
  const restaurantDetail = await fetchDetail(id)

  appContainer.innerHTML = template(restaurantDetail)

  const favDB = new FavoriteDB('fav-db', 'fav-store')
  const favBtn = new FavoriteButton({
    buttonId: '#add-or-remove-fav',
    db: favDB,
    detail: restaurantDetail
  })
  await favDB.initDB()
  await favBtn.initButton()
  
  window.addEventListener('hashchange', () => {
    favDB.close()
  })

  hideLoadingElement()
}

async function fetchDetail (id) {
  const { restaurant } = await fetch(GET_RESTAURANT_DETAIL_API + '/' + id).then(
    res => res.json()
  )
  return restaurant
}
