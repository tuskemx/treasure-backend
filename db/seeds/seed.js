const owner = require('../data/test-data/owners');
const shop = require('../data/test-data/shops');
const formattingFunctions = require('../../utils/formattingFunctions')


exports.seed = function (knex, Promise) {
  return knex
    .insert(owner)
    .into('owners')
    .returning('*')
    .then((result) => console.log(result))
};



console.log(shop)

// exports.seed = function (knex, Promise) {
//   return knex
//     .insert(shop)
//     .into('shops')
//     .returning('*')
//     .then((result) => console.log(result));
// };

// CREATE TABLE owners(
//   owner_id SERIAL PRIMARY KEY,
//   forename VARCHAR(255),
//   surname VARCHAR(255),
//   age INT NOT NULL,
//   CHECK(age BETWEEN 16 AND 250)
// );