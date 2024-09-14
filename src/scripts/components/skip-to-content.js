class SkipToContent extends window.HTMLElement {
  constructor () {
    super()
    const mainContentId = this.getAttribute('main-content-id')
    this.innerHTML = /* html */ `
      <a id='skip-to-content' href='#${mainContentId}'> Skip to content </a>
    `
  }
}

window.customElements.define('skip-to-content', SkipToContent)
