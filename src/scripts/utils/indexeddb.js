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

async function addData (data) {
  const tx = await db.transaction(storeName, 'readwrite')
  return await Promise.all([tx.store.add(data), tx.done])
}

async function deleteData (dataId) {
  const tx = await db.transaction(storeName, 'readwrite')
  return await Promise.all([tx.store.delete(dataId), tx.done])
}

export async function initFavoriteButton (buttonId, restaurant) {
  let isExist = await db.get(storeName, restaurant.id)
  const favButton = q(buttonId)

  renderFavoriteButtonText(restaurant.id, favButton)
  favButton.addEventListener('click', async e => {
    if (isExist) {
      await deleteData(restaurant.id)
      console.debug('db: deleted', restaurant.id, restaurant.name)
    } else {
      await addData(restaurant)
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

export async function getAllRestaurant () {
  const tx = await db.transaction(storeName, 'readwrite')
  return (await Promise.all([tx.store.getAll(), tx.done]))[0]
}

export class FavoriteDB {
  constructor (dbName, storeName) {
    this._dbName = dbName
    this._storeName = storeName
  }

  async initDB () {
    this._db = await openDB(this._dbName, 1, {
      upgrade: db => {
        if (!db.objectStoreNames.contains(this._storeName)) {
          const store = db.createObjectStore(this._storeName, { keyPath: 'id' })
          store.createIndex('id', 'id')
        }
      }
    })
  }

  _writeTx () {
    return this._db.transaction(this._storeName, 'readwrite')
  }

  async add (data) {
    const tx = this._writeTx()
    const res = await Promise.all([tx.store.add(data), tx.done])
    return res[0]
  }
  
  async delete (id) {
    const tx = this._writeTx()
    const res = await Promise.all([tx.store.delete(id), tx.done])
    return res[0]
  }
  
  async get(id) {
    const tx = this._writeTx()
    const res = await Promise.all([tx.store.get(id), tx.done])
    return res[0]
  }
}

// TODO: delete this
async function testFavDB () {
  console.log('db: start')
  const db = new FavoriteDB('fav-db', 'fav-store')
  await db.initDB()
  // const now = Date.now()
  const now = 'fake-id-temporary'
  const id = await db.add({ id: now, name: 'test' })
  console.log('db: added', id)
  const resGet = await db.get(now + 'x')
  console.log('db: get', resGet)
  const idDel = await db.delete(now)
  console.log('db: deleted', idDel)
}

// testFavDB()
