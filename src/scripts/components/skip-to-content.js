class SkipToContent extends HTMLElement {
  constructor () {
    super()
    const mainContentId = this.getAttribute('main-content-id')
    this.innerHTML = /* html */ `
      <a id='skip-to-content' href='#${mainContentId}'> Skip to content </a>
    `
  }
}

customElements.define('skip-to-content', SkipToContent)
