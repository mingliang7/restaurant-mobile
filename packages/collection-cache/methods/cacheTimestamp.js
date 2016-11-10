Mongo.Collection.prototype.cacheTimestamp = function () {
    var thisCollection = this;

    /********** Before Insert **********/
    thisCollection.before.insert(function (userId, doc) {
        doc.createdAt = moment().toDate();
        doc.createdBy = userId;

        //console.log('Cache Timestamp->' + thisCollection._name + '.before.insert()');
    });

    /********** Before Update **********/
    thisCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
        modifier.$set = modifier.$set || {};
        modifier.$set.updatedAt = moment().toDate();
        modifier.$set.updatedBy = userId;

        //console.log('Cache Timestamp->' + thisCollection._name + '.before.update()');
    });
};