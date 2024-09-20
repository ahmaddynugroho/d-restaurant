import { openDB } from 'idb'

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

  close () {
    this._db.close()
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

  async get (id) {
    const tx = this._writeTx()
    const res = await Promise.all([tx.store.get(id), tx.done])
    return res[0]
  }

  async getAll () {
    const tx = this._writeTx()
    const res = await Promise.all([tx.store.getAll(), tx.done])
    return res[0]
  }
}
