Restaurant.Collection.Materials = new Mongo.Collection('restaurant_material');

Restaurant.Schema.Materials = new SimpleSchema({
  name: {
    type: String,
    label: 'ឈ្មោះ'
  },
  enName: {
    type: String,
    label: 'ឈ្មោះអង់គ្លេស'
  },
  unitId: {
    type: String,
    label: "ខ្នាត",
    autoform: {
      type: "select",
      options: function() {
        return Restaurant.List.unit();
      }
    }
  },
  price: {
    type: String,
    label: 'តម្លៃ'
  },
  description: {
    type: String,
    optional: true,
    label: 'បរិយាយ'
  },
  _unit: {
    type: Object,
    optional: true,
    blackbox: true
  },
  _outstandingAmount:{
    type: [Object],
    optional: true,
  },
  '_outstandingAmount.$.reduceStockId':{
    type: String,
    optional: true,
  },
  '_outstandingAmount.$.eopId':{
    type: String,
    optional: true,
  },
  '_outstandingAmount.$.reduceStockDate':{
    type: String,
    optional: true
  },
  '_outstandingAmount.$.qty':{
    type: Number,
    optional: true,
    decimal: true
  },
});
Restaurant.Collection.Materials.search = function(query, limit) {
  let limitAmount = limit || 30
  if (!query) {
    return;
  }
  let regPattern = `${query}`;
  let reg = new RegExp(regPattern, 'i'); //match all case
  return Restaurant.Collection.Materials.find({
    $or: [{
        enName: {
          $regex: reg
        }
      }, {
        name: {
          $regex: reg
        }
      }

    ]
  }, {
    sort: {
      name: 1
    },
    limit: limitAmount
  });
};
Restaurant.Collection.Materials.attachSchema(Restaurant.Schema.Materials);
