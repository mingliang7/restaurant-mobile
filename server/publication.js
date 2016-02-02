

Meteor.publish('categories',() =>{
    return Categories.find();
});


Meteor.publish('tags', ()=> {
    return Book.Collection.Tags.find();
});