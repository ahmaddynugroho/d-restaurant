import { renderDetailPage } from './pages/detail.js'
import { renderMainPage } from './pages/main.js'

const routes = {
  '#/': renderMainPage,
  '#/awikwok/:id': renderMainPage,
  '#/detail/:id': renderDetailPage
}

renderPage()

window.addEventListener('hashchange', () => {
  renderPage()
})

function renderPage () {
  const hash = window.location.hash || '#/'
  const hashParts = hash.split('/')

  Object.keys(routes).forEach(route => {
    const routeParts = route.split('/')
    if (hashParts.length !== routeParts.length) return

    const paramIndex = routeParts.findIndex(v => v.includes(':'))
    if (paramIndex === -1) return routes[route]()

    const isCorrectPath = routeParts.slice(0, -1).reduce((a, c, i) => {
      if (!a) return
      return c === hashParts[i]
    }, true)
    if (!isCorrectPath) return

    routes[route](hashParts[paramIndex])
    console.debug('rendering', route, 'with param', hashParts[paramIndex])
  })
}
