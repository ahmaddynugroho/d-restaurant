Feature('favorite')

Scenario('Add or Remove favorite', ({ I }) => {
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867')
  I.see('Add to favorite')
  I.click('Add to favorite')
  I.see('Remove from favorite')
  I.click('Remove from favorite')
  I.see('Add to favorite')
})

Scenario('Add and see in favorite page', ({ I }) => {
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867')
  I.see('Add to favorite')
  I.click('Add to favorite')
  I.amOnPage('/#/favorite')
  I.see('Melting Pot')
})
