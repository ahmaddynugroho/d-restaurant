class RestaurantNav extends HTMLElement {
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

customElements.define('restaurant-nav', RestaurantNav)
