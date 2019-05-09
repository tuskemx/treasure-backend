
const nameIdPair = (ownerObj) => {
  const newObj = ownerObj.reduce((obj, item) => {
    obj[item.forename] = item.owner_id;
    return obj;
  }, {})

  return newObj

}

const formatShopData = (shops, valuePair) => {
  const newShops = shops.map(function (shop) {
    const newShop = { ...shop }
    newShop.owner_id = valuePair[shop.owner]
    delete newShop.owner
    return newShop;
  });

  return newShops;

}

const shopIdPair = (shopObj) => {
  const newShopObj = shopObj.reduce((obj, item) => {
    obj[item.shop_name] = item.shop_id;
    return obj;
  }, {})
  return newShopObj
}

const formatTreasure = (treasure, shopPair) => {
  const newTreasure = treasure.map(function (piece) {
    const newTreasurepiece = { ...piece }
    newTreasurepiece.shop_id = shopPair[piece.shop]
    delete newTreasurepiece.shop;
    return newTreasurepiece;
  });

  return newTreasure;

}


module.exports = {
  nameIdPair,
  formatShopData,
  shopIdPair,
  formatTreasure
}