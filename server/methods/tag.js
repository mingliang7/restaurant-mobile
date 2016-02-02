Meteor.methods({
    removeTag(id){
        console.log(id)
        Book.Collection.Tags.remove(id)
    }
});