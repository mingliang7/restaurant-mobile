Meteor.methods({
  removeMaterialCategory(id){
    Restaurant.Collection.MaterialCategories.remove(id);
  }
});
