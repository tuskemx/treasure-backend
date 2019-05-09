
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
    // if (shop['owner'] === valuePair['forename']) {
    //   shop.owner_id = valuePair['forename'];}

    //because map returns an array and trying to assign objects




  });

  return newShops;


}



// const formatShopData = (obj) => {
//   return obj.map(function (el) {
//     obj.owner_id = el.owner_id;
//     delete obj.owner;
//   })
// }

module.exports = {
  nameIdPair,
  formatShopData
}