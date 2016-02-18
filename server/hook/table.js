Restaurant.Collection.Tables.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.Tables, 5);
    doc.left=250;
    doc.top=300;
    var lastTable=Restaurant.Collection.Tables.findOne({tableLocationId:doc.tableLoctionId},{sort:{_id:-1}});
});
