const formatShopData = (obj) => {
  return obj.map(function (el) {
    obj.owner_id = el.owner_id;
    delete obj.owner;
  })
}

module.exports = {
  formatShopData
}