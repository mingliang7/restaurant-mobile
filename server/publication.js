Meteor.publish('tables', ()=> {
    return Table.find();
});

Meteor.publish('table', (id)=> {
    return Table.find(id);
});

Meteor.publish('categories',() =>{
    return Categories.find();
});

Meteor.publish('product', (categoryId) =>{
   return Product.find({categoryId: categoryId});
});