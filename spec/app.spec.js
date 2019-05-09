process.env.NODE_ENV = 'test';
const chaiSorted = require('chai-sorted')
const chai = require('chai')
const {
  expect
} = require('chai');
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection')

chai.use(chaiSorted);

describe('/api', () => {
  after(() => connection.destroy());
  describe('/treasure', () => {
    it('responds with an array of treasure objects, each object having the correct properties', () => {
      return request(app)
        .get('/api/treasure')
        .expect(200)
        .then(res => {
          expect(res.body.treasure).to.be.an('array');
          expect(res.body.treasure[0]).to.contain.keys('treasure_name', 'colour', 'age', 'cost_at_auction', 'shop_id')
        })
    })
    it('returns treasures sorted by price low to high', () => {
      return request(app)
        .get('/api/treasure')
        .expect(200)
        .then(res => {
          console.log(res.body.treasure)
          expect(res.body.treasure).to.be.sorted({
            descending: false
          })
        })
    })
  })
})

// {
//   treasure_name: 'treasure-a',
//   colour: 'turquoise',
//   age: 200,
//   cost_at_auction: '20.00',
//   shop_id: 1
// }