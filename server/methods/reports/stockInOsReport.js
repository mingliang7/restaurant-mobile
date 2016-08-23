Meteor.methods({
    getStockInOsReport(params) {
        var data = {
            title: {},
            header: {},
            content: [{
                index: 'No Result'
            }],
            footer: {}
        };
        let selector = {};
        data.title = Restaurant.Collection.Company.findOne();
        data.header.date = params.date;
        data.header.materialCategory = params.materialCategoryId == '' ? 'ទាំងអស់' : Restaurant.Collection.MaterialCategories.findOne(params.materialCategoryId).name;
        data.header.material = params.materialId == '' ? 'ទាំងអស់' : Restaurant.Collection.Materials.findOne(params.materialId).name;
        let tomorrow = moment(params.date, 'YYYY-MM-DD').add('1', 'days').toDate();
        selector.date = {
            $lt: tomorrow
        };
        if(params.materialCategoryId != ''){
          selector.materialCategoryId = params.materialCategoryId;
        }
        if(params.materialId != ''){
          selector.materialId = params.materialId;
        }
        let inventory = Restaurant.Collection.Inventory.aggregate([{
            $match: selector
        }, {
            $sort: {
                date: 1
            }
        }, {
            $lookup: {
                from: "restaurant_material",
                localField: "materialId",
                foreignField: "_id",
                as: "materialDoc"
            }
        }, {
            $unwind: {
                path: '$materialDoc',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $group: {
                _id: '$materialId',
                lastMaterial: {
                    $last: {
                        openingBalance: '$openingBalance',
                        balance: '$balance',
                        date: '$date',
                        reduceQty: '$reduceQty',
                        stockIn: '$stockIn',
                        material: '$materialDoc'
                    }
                }
            }
        }, {
            $sort: {
                'lastMaterial.material.name': -1
            }
        }, {
            $group: {
                _id: null,
                data: {
                    $addToSet: "$$ROOT"
                }
            }
        }]);
        data.content = inventory[0].data;
        console.log(data.content);
        return data;
    }
});
