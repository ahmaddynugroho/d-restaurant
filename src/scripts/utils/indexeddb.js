import { openDB } from 'idb'
import { q } from './query-selector'

const dbName = 'RestaurantDB'
const storeName = 'RestaurantStore'

const db = await useDB(dbName, storeName)
console.debug('db: opened', dbName, storeName)

async function useDB (dbName, storeName) {
  return await openDB(dbName, 1, {
    upgrade (db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id' })
        store.createIndex('id', 'id')
      }
    }
  })
}

async function addData (db, data) {
  const tx = await db.transaction(storeName, 'readwrite')
  return await Promise.all([tx.store.add(data), tx.done])
}

async function deleteData (db, dataId) {
  const tx = await db.transaction(storeName, 'readwrite')
  return await Promise.all([tx.store.delete(dataId), tx.done])
}

export async function initFavoriteButton (buttonId, restaurant) {
  let isExist = await db.get(storeName, restaurant.id)
  const favButton = q(buttonId)

  renderFavoriteButtonText(restaurant.id, favButton)
  favButton.addEventListener('click', async e => {
    if (isExist) {
      await deleteData(db, restaurant.id)
      console.debug('db: deleted', restaurant.id, restaurant.name)
    } else {
      await addData(db, restaurant)
      console.debug('db: added', restaurant.id, restaurant.name)
    }
    isExist = !isExist
    renderFavoriteButtonText(restaurant.id, favButton)
  })
}

async function renderFavoriteButtonText (restaurantId, favButton) {
  const isExist = await db.get(storeName, restaurantId)
  if (isExist) {
    favButton.innerHTML = 'Remove from favorite'
  } else {
    favButton.innerHTML = 'Add to favorite'
  }
}
