import { openDB } from 'idb'

const favStoreName = 'fav-store'
const favDB = openDB('fav-db', 1, {
  upgrade (db) {
    db.createObjectStore(favStoreName, {
      keyPath: 'id'
    })
  }
})

export const favActions = {
  put: async (data) => (await favDB).put(favStoreName, data),
  get: async key => (await favDB).get(favStoreName, key),
  delete: async key => (await favDB).delete(favStoreName, key),
  getAll: async () => (await favDB).getAll(favStoreName)
}
