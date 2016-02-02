Meteor.methods({
    removeTag(id){
        console.log(id)
        Reading.Collection.Tags.remove(id)
    }
});