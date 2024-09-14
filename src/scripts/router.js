import { renderMainPage } from './pages/main.js'

const routes = {
  '#/': renderMainPage
}

renderPage()

window.addEventListener('hashchange', () => {
  renderPage()
})

function getHash () {
  return window.location.hash
}

function renderPage () {
  let hash = getHash() || '#/'
  if (hash in routes) routes[hash]()
}
