

Meteor.publish('categories',() =>{
    return Categories.find();
});


Meteor.publish('tags', ()=> {
    return Reading.Collection.Tags.find();
});