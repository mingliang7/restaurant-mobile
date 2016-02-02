Meteor.methods({
    removeCategory(id){
        Categories.remove(id);
    }
});