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
          const newBody = res.body.treasure.map(function (el) {
            el.cost_at_auction = Number(el.cost_at_auction)
            return el;
          })
          // console.log(newBody)
          expect(newBody).to.be.ascendingBy('cost_at_auction')
        })
    })
    it('returns treasures sorted by age, the first result being the youngest', () => {
      return request(app)
        .get('/api/treasure?sort_by=age')
        .expect(200)
        .then(res => {
          // console.log(res.body.treasure)
          expect(res.body.treasure).to.be.ascendingBy('age')
        })
    })
    it('returns treasures with a limit of 25', () => {
      return request(app)
        .get('/api/treasure')
        .expect(200)
        .then(res => {
          // console.log(res.body.treasure)
          expect(res.body.treasure).to.have.lengthOf(25)
        })
    })
    it('returns treasures with a limit of 10', () => {
      return request(app)
        .get('/api/treasure?limiter=10')
        .expect(200)
        .then(res => {
          // console.log(res.body.treasure)
          expect(res.body.treasure).to.have.lengthOf(10)
        })
    })
    it('returns treasures sorted by price high to low', () => {
      return request(app)
        .get('/api/treasure?order=desc')
        .expect(200)
        .then(res => {
          const newBody = res.body.treasure.map(function (el) {
            el.cost_at_auction = Number(el.cost_at_auction)
            return el;
          })
          // console.log(newBody)
          expect(newBody).to.be.descendingBy('cost_at_auction')
        })
    })
    it('returns treasures with colour value of gold', () => {
      return request(app)
        .get('/api/treasure?colour=gold')
        .expect(200)
        .then(res => {
          console.log(res.body.treasure)
          expect(res.body.treasure[0]).to.include({
            colour: 'gold'
          })
        })
    })
    it('returns treasures with max age of 20', () => {
      return request(app)
        .get('/api/treasure?max_age=20')
        .expect(200)
        .then(res => {
          console.log(res.body.treasure)
          expect(res.body.treasure[0].age).to.be.lessThan(20)
        })
    })
  })
})

//// GET /search?q=tobi+ferret
// req.query.q
// => "tobi ferret"

// {
//   treasure_name: 'treasure-a',
//   colour: 'turquoise',
//   age: 200,
//   cost_at_auction: '20.00',
//   shop_id: 1
// }