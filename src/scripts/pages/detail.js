import { hideLoadingElement, showLoadingElement } from '../components/loading'
import { q } from '../utils/query-selector'

export function renderDetailPage (id) {
  showLoadingElement()
  const appContainer = q('#app')
  appContainer.innerHTML = `<h1>ini detail ${id}</h1>`
  hideLoadingElement()
}
