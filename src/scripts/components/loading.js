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
