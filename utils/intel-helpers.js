/*  eslint  no-plusplus:0  */
const faker = require('faker');
const { sample, random } = require('lodash');
const { promisify } = require('util');
const fs = require('fs');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const generateMultiples = (n, generator, relatedData) => {
  return Array.from({ length: n }, () => generator(relatedData));
};

const generateUniques = (randomList, listLength, generator) => {
  if (listLength === 0) return randomList;
  const randomItem = generator();
  if (randomList.includes(randomItem)) return generateUniques(randomList, listLength, generator);
  return generateUniques([randomItem, ...randomList], --listLength, generator);
};

const createRandomFirstName = () => faker.name.firstName();
const createRandomSurname = () => faker.name.lastName();
const createRandomShopName = () => faker.company.companyName();

const uniqueFirstNames = generateUniques([], 50, createRandomFirstName, 'firstNames');
const uniqueSurNames = generateUniques([], 50, createRandomSurname, 'surNames');
const uniqueShopNames = generateUniques([], 100, createRandomShopName, 'surNames');

const generateOwners = (firstNames, surNames) => {
  return firstNames.map((firstName, i) => {
    return {
      forename: firstName,
      surname: surNames[i],
      age: random(16, 120),
    };
  });
};

const generateShops = (shopNames, owners) => {
  return shopNames.map((shopName) => {
    return {
      shop_name: shopName,
      owner: sample(owners),
      logan: faker.company.catchPhrase(),
    };
  });
};

const generateTreasures = (shops, treasureCount) => {
  return Array.from({ length: treasureCount }, () => {
    return {
      treasure_name: `${faker.company.catchPhraseAdjective()} ${faker.commerce.productName()}`,
      colour: faker.commerce.color(),
      age: random(5, 1000),
      cost_at_auction: random(0, 100000),
      shop: sample(shops).shop_name,
    };
  });
};

const owners = generateOwners(uniqueFirstNames, uniqueSurNames);
// console.log(owners);
const shops = generateShops(uniqueShopNames, uniqueFirstNames);
// console.log(shops, '<-- shops');
const treasures = generateTreasures(shops, 200);
console.log(treasures, '<--- treasures');


const generateFileText = js => `module.exports = ${JSON.stringify(js, null, 2)}`;

module.exports = (ownerCount, shopCount, treasureCount) => {
  const owners = generateMultiples(ownerCount, generateOwner);
  const shops = generateMultiples(shopCount, generateShop, owners);
  const treasures = generateMultiples(
    treasureCount,
    generateTreasure,
    shops,
  );
  mkdir('./db/data/dev-data')
    .catch(() => console.log('Overwriting existing files in intel directory'))
    .then(() => {
      return writeFile(
        './db/data/dev-data/owners.js',
        generateFileText(owners),
        'utf8',
      );
    })
    .then(() => {
      return writeFile(
        './db/data/dev-data/shops.js',
        generateFileText(shops),
        'utf8',
      );
    })
    .then(() => {
      return writeFile(
        './db/data/dev-data/treasures.js',
        generateFileText(treasures),
        'utf8',
      );
    });
};
