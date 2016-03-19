Meteor.methods({
  getMaterialName(id){
     return Restaurant.Collection.Materials.findOne(id).name;
  }
});
