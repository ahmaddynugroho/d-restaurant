class RestaurantFooter extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = /* html */ `
      <footer>Copyright@2024 RESTO ISEKAI</footer>
    `
  }
}

customElements.define('restaurant-footer', RestaurantFooter)
