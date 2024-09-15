import { openDB } from 'idb'

const dbName = 'RestaurantDB'
const storeName = 'RestaurantStore'

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

console.debug('db: usedb')
const db = await useDB(dbName, storeName)
console.debug('db: adding')
await addData(db, { id: Date.now().toString(), name: Date.now().toString() })
console.debug('db: added')
console.debug('db: adding')
await addData(db, { id: Date.now().toString(), name: Date.now().toString() })
console.debug('db: added')
