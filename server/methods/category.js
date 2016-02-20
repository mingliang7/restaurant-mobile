Meteor.methods({
    removeCategory(id){
        Restaurant.Collection.Categories.remove(id);
    }
});
