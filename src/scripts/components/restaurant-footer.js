class RestaurantFooter extends window.HTMLElement {
  constructor () {
    super()
    this.innerHTML = /* html */ `
      <footer>Copyright@2024 RESTO ISEKAI</footer>
    `
  }
}

window.customElements.define('restaurant-footer', RestaurantFooter)
