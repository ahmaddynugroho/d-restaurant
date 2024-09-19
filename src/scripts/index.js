import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'

import './components/skip-to-content.js'
import './components/restaurant-nav.js'
import './components/restaurant-footer.js'
import './components/loading.js'

import './router.js'

import './utils/indexeddb.js'
import { Workbox } from 'workbox-window'

window.addEventListener('load', async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('service worker not supported')
    return
  }

  const wb = new Workbox('./sw.bundle.js')

  try {
    await wb.register()
    console.log('Registered sw with score')
  } catch (error) {
    console.error('SW registration error:', error)
  }
})
