Meteor.methods({
  getMaterialName(id) {
    return Restaurant.Collection.Materials.findOne(id).name;
  },
  getUnitName(id) {
    return Restaurant.Collection.Materials.findOne(id)._unit.name;
  },
  getMaterial(id){
    let material = Restaurant.Collection.Materials.findOne(id);
    let unit = Restaurant.Collection.Units.findOne(material.unitId);
    return `${material.name}(${unit.name})`;
  },
  fetchMaterials(query) {
    let selector = {};
    if (query !== null && query !== '') {
      let regPattern = `${query}`;
      let reg = new RegExp(regPattern, 'i'); //match all case
      selector = {
        $or: [{
          enName: {
            $regex: reg
          }
        }, {
          name: {
            $regex: reg
          }
        }]
      };
    }
    let materials = Restaurant.Collection.Materials.find(selector,{limit: 20});
    let list = [];
    if (materials.count() > 0) {
      materials.forEach((material) => {
        list.push({
          label: `${material.name}`,
          value: `${material._unit.name} ${material.price} ${material._id}`
        });
      });
    }
    return list;
  }
});
