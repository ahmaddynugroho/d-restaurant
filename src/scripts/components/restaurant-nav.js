import { q, qa } from '../utils/query-selector'

class RestaurantNav extends window.HTMLElement {
  constructor () {
    super()
    this.innerHTML = /* html */ `
      <nav>
        <div id="nav-drawer">
            <span>RESTO ISEKAI</span>
            <button id="show-menu">Menu</button>
        </div>
        <a href="/">Home</a>
        <a href="#">Favorite</a>
        <a href="https://github.com/ahmaddynugroho" target="_blank">About Us</a>
      </nav>
    `
  }
}

window.customElements.define('restaurant-nav', RestaurantNav)

/** @type {HTMLButtonElement} */
const showNavMenuButton = q('#show-menu')

/** @type {NodeListOf<HTMLAnchorElement>} */
const navLinks = qa('nav a')

showNavMenuButton.addEventListener('click', e => {
  navLinks.forEach(e => {
    const currentDisplay = e.style.display
    e.style.display =
      currentDisplay === 'inline-block' ? 'none' : 'inline-block'
  })
})
