Restaurant.Collection.Categories.before.insert(function(userId, doc) {
  doc._id = idGenerator.gen(Restaurant.Collection.Categories, 3);
  //doc.level = doc.parentId == null ? 0 : Restaurant.Collection.Categories.findOne(doc.parentId).level + 1;
});
Restaurant.Collection.Categories.after.insert(function(userId, doc) {
  if (doc.tags) {
    Meteor.call('updateProductTagByCategory', doc._id, doc.tags);
  }
});
Restaurant.Collection.Categories.after.update(function(userId, doc) {
  if (doc.tags) {
    Meteor.call('updateProductTagByCategory', doc._id, doc.tags);
  }
});
/*
Restaurant.Collection.Categories.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    if (modifier.$set.parentId == null) {
        Restaurant.Collection.Categories.direct.update(doc._id,
            {$set: {level: 0}, $unset: {_parent: ""}}
        );
    } else {
        var level = Restaurant.Collection.Categories.findOne(modifier.$set.parentId).level + 1;
        Restaurant.Collection.Categories.direct.update(doc._id,
            {$set: {level: level}}
        );
    }
});

var getCategoryIds = function (array, categories) {
    if (categories != null) {
        categories.forEach(function (c) {
            array.push(c._id);
            var cats = Restaurant.Collection.Categories.find({parentId: c._id});
            if (cats != null) {
                return getCategoryIds(array, cats);
            }
        });
    }
    return array;
};


Restaurant.Collection.Categories.after.update(function (userId, doc, fieldNames, modifier, options) {
    var categories = Restaurant.Collection.Categories.find({parentId: doc._id});
    var array = [];
    array = getCategoryIds(array, categories);
    var childCategories = Restaurant.Collection.Categories.find({_id: {$in: array}});
    childCategories.forEach(function (c) {
        var level = Restaurant.Collection.Categories.findOne(c.parentId).level + 1;
        Restaurant.Collection.Categories.direct.update(c._id,
            {$set: {level: level}}
        );
    });
}, {fetchPrevious: true});*/

/*


 var categories = Restaurant.Collection.Categories.find({parentId: 0000001});
 var arr=[];
 if (categories != null) {
 categories.forEach(function (c) {
 arr.push(c._id);
 var cats=Restaurant.Collection.Categories.find({parentId: c.parentId});
 if(cats!=null){

 }
 });
 }
 Restaurant.Collection.Categories.direct.update(c._id,
 {$set: {level: level, parentId: c.parentId}}
 );


 var categories = Restaurant.Collection.Categories.find({parentId: 0000001});
 var getCategoryIds= function(array,categories){

 if (categories != null) {
 categories.forEach(function (c) {
 array.push(c._id);
 var cats=Restaurant.Collection.Categories.find({parentId: c.parentId});
 if(cats!=null){
 return getCategoryIds(array,cats);
 }
 });
 }
 return array;
 };

 var countdown = function(value) {
 if (value > 0) {
 console.log(value);
 return countdown(value - 1);
 } else {
 return value;
 }
 };
 countdown(10);

 */
