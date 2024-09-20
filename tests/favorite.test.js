import { FavoriteButton } from '../src/scripts/pages/detail'
import { FavoriteDB } from '../src/scripts/utils/indexeddb'
import { q } from '../src/scripts/utils/query-selector'

describe('Favorite restaurant', () => {
  it('should be able to favorite a restaurant', async () => {
    document.querySelector('body').innerHTML = /* html */ `
      <button id="fav-test">test btn</button>
    `
    const favDB = new FavoriteDB('test-fav-db', 'test-fav-store')
    const favBtn = new FavoriteButton({
      buttonId: '#fav-test',
      db: favDB,
      detail: { id: 'test-id' }
    })
    await favDB.initDB()
    await favBtn.initButton()

    expect(q('#fav-test').innerHTML).toEqual('Add to favorite')
  })
})
