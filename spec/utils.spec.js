const {
  formatShopData
} = require('../utils/formattingFunctions');
const {
  expect
} = require('chai')

describe('formatShopData', () => {
  it('[{}] --> []', () => {
    const input = [{
      shop_name: 'shop-b',
      owner: 'firstname-b',
      slogan: 'slogan-b'
    }]
    const expected = [{
      shop_name: 'shop-b',
      owner_id: 1,
      slogan: 'slogan-b'
    }]
    expect(input).to.equal(expected);
  })
})