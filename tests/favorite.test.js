import 'fake-indexeddb/auto'
import { favActions } from '../src/scripts/utils/indexeddb'

class MockRestaurant {
  constructor () {
    this.restaurantDetail = { id: 1 }
    this.id = this.restaurantDetail.id
    this.favBtn = document.querySelector('#test-fav')
  }
}

describe('Favorite restaurant', () => {
  beforeEach(() => {
    document.querySelector('body').innerHTML = /* html */ `
      <button id="test-fav">test fav btn</button>
    `
  })

  it('should be able to add', async () => {
    await favActions.put({ id: 1 })
    const savedRes = await favActions.get(1)
    expect(savedRes).toEqual({ id: 1 })
  })

  it('should be able to remove', async () => {
    await favActions.put({ id: 1 })
    const savedRes = await favActions.get(1)
    expect(savedRes).toEqual({ id: 1 })
    const deletedRes = await favActions.delete(1)
    expect(deletedRes).toEqual(undefined)
  })

  it('should be able to add by clicking', async () => {
    const { restaurantDetail, id, favBtn } = new MockRestaurant()
    favBtn.textContent = 'Add to favorite'

    await new Promise(resolve => {
      favBtn.addEventListener('click', async () => {
        await favActions.put(restaurantDetail)
        favBtn.textContent = 'Remove from favorite'
        resolve()
      })

      favBtn.dispatchEvent(new Event('click'))
    })
    const savedRes = await favActions.get(id)

    expect(favBtn.textContent).toEqual('Remove from favorite')
    expect(savedRes).toEqual(restaurantDetail)
  })

  it('should be able to remove by clicking', async () => {
    const { restaurantDetail, id, favBtn } = new MockRestaurant()

    await favActions.put(restaurantDetail)
    favBtn.textContent = 'Remove from favorite'

    await new Promise(resolve => {
      favBtn.addEventListener('click', async () => {
        await favActions.delete(id)
        favBtn.textContent = 'Add to favorite'
        resolve()
      })

      favBtn.dispatchEvent(new Event('click'))
    })
    const savedRes = await favActions.get(id)

    expect(favBtn.textContent).toEqual('Add to favorite')
    expect(savedRes).toEqual(undefined)
  })
})
