import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'

import './components/skip-to-content.js'
import './components/restaurant-nav.js'
import './components/restaurant-footer.js'
import './components/loading.js'

import './router.js'

import './utils/indexeddb.js'

window.addEventListener('load', async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('service worker not supported')
    return
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.bundle.js')
    console.log('Registered sw with score', registration.scope)
  } catch (error) {
    console.error('SW registration error:', error)
  }
})
