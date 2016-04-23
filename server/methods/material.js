Meteor.methods({
  getMaterialName(id) {
    return Restaurant.Collection.Materials.findOne(id).name;
  },
  getMaterial(id){
    let material = Restaurant.Collection.Materials.findOne(id);
    let unit = Restaurant.Collection.Units.findOne(material.unitId);
    return `${material.name}(${unit.name})`;
  },
  fetchMaterials(query) {
    let selector = {};
    if (query !== null && query != '') {
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
  }
});
