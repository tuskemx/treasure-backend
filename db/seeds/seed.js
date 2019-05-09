const ownerData = require('../data/test-data/owners');
const shop = require('../data/test-data/shops');
const treasure = require('../data/test-data/treasures')
const { nameIdPair, formatShopData, shopIdPair, formatTreasure } = require('../../utils/formattingFunctions')


exports.seed = function (knex, Promise) {
  return knex
    .insert(ownerData)
    .into('owners')
    .returning('*')
    .then((insertedOwners) => {
      const valuePair = nameIdPair(insertedOwners);
      const logShop = formatShopData(shop, valuePair);
      console.log(logShop);
      return logShop;
    }).then((logShop) => {
      console.log(logShop);
      console.log("logshop above post then")
      return knex
        .insert(logShop)
        .into('shops')
        .returning('*');
    }).then((insertedShops) => {
      const shopPair = shopIdPair(insertedShops);
      console.log(shopPair);
      const logTreasure = formatTreasure(treasure, shopPair);
      console.log(logTreasure);
      return logTreasure;
    }).then((logTreasure) => {
      console.log(logTreasure);
      console.log("current LAST THEN BLOCK");
      return knex
        .insert(logTreasure)
        .into('treasures')
        .returning('*')
    })
}








// console.log(shop)

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