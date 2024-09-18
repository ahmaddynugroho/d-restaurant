import { renderDetailPage } from './pages/detail.js'
import { renderFavoritePage } from './pages/favorite.js'
import { renderMainPage } from './pages/main.js'

const routes = {
  '#/': renderMainPage,
  '#/detail/:id': renderDetailPage,
  '#/favorite': renderFavoritePage
}

renderPage()

window.addEventListener('hashchange', () => {
  renderPage()
})

function renderPage () {
  const hash = window.location.hash || '#/'

  for (const r in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, r)) {
      const renderFn = routes[r]
      if (!hash.includes(':') && hash === r) {
        renderFn()
        break
      }
      const rParts = r.split('/')
      const hParts = hash.split('/')

      let paramIndex = -1
      let isValidRoute = true
      for (let i = 0; i < rParts.length; i++) {
        const rp = rParts[i]

        if (rp.includes(':')) {
          paramIndex = i
          break
        }
        if (rp !== hParts[i]) {
          isValidRoute = false
          break
        }
      }
      if (!isValidRoute) continue

      renderFn(hParts[paramIndex])
      break
    }
  }
}
