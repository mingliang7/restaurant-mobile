

Meteor.publish('tables',() =>{
    return Restaurant.Collection.Tables.find();
});
