import { hideLoadingElement, showLoadingElement } from '../components/loading'
import { GET_RESTAURANT_DETAIL_API } from '../config'
import { q } from '../utils/query-selector'

export async function renderDetailPage (id) {
  showLoadingElement()
  const appContainer = q('#app')
  const restaurantDetail = await fetchDetail(id)
  appContainer.innerHTML = `<h1>ini detail ${id}</h1>`
  console.debug('done', restaurantDetail)
  hideLoadingElement()
}

async function fetchDetail (id) {
  const { restaurant } = await fetch(GET_RESTAURANT_DETAIL_API + '/' + id).then(
    res => res.json()
  )
  return restaurant
}
