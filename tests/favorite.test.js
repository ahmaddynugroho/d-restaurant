import "fake-indexeddb/auto"
import { favActions } from "../src/scripts/utils/indexeddb"

describe('Favorite restaurant', () => {
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
})
