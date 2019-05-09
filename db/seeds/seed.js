const ownerData = require('../data/test-data/owners');
const shop = require('../data/test-data/shops');
const { nameIdPair } = require('../../utils/formattingFunctions')
const { formatShopData } = require('../../utils/formattingFunctions')




// count = 1;
// ownerData.forEach(function (el) {
//   el.owner_id = count;
//   count++
// }
// });

// console.log(ownerData);

// shop.map(function (ind) {
//   if (ind['owner'] === ownerData['forename'])
//     ind[owner_id] = ownerData[forename];
// });
// console.log(shop);



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