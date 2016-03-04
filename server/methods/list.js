Meteor.methods({
    getCustomerList(){
        var list = [];
        Restaurant.Collection.Customers.find().forEach(function (obj) {
            list.push({
                label: obj.name,
                value: obj._id
            });
        });
        return list;
    },
    getCategoryList(){
        var list = [];
        Restaurant.Collection.Categories.find().forEach(function (obj) {
            list.push({
                label: obj.name,
                value: obj._id
            });
        });
        return list;
    }
});