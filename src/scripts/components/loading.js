import { q } from '../utils/query-selector.js'

class LoadingIndicator extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = /* html */ `
      <p id="loading" style="background-color: bisque">
        Sedang mengambil data dari server...
      </p>
    `
  }
}

customElements.define('loading-indicator', LoadingIndicator)

export function showLoadingElement () {
  /** @type {HTMLDivElement} */
  const loadingElement = q('#loading')
  loadingElement.style.display = 'block'
}

export function hideLoadingElement () {
  /** @type {HTMLDivElement} */
  const loadingElement = q('#loading')
  loadingElement.style.display = 'none'
}
