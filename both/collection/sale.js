Restaurant.Collection.Sales = new Mongo.Collection("restaurant_sales");
Restaurant.Collection.Sales.search = function(query, saleId) {
  saleId = saleId || '';
  // if (!query) {
  //   return;
  // }
  let regPattern = `${query}`
  let reg = new RegExp(regPattern, 'i') //match all case
  return Restaurant.Collection.Sales.find({
    status: 'active',
    _id: {
      $ne: saleId
    },
    $or: [{
      _id: {
        $regex: reg
      }
    }, {
      description: {
        $regex: reg
      }

    }]
  }, {
    limit: 5
  });
}
Restaurant.Collection.Sales.searchByTable = function(query, locations, status, date, limit) {
  if (!query) {
    return;
  }
  let regPattern = `${query}`
  let reg = new RegExp(regPattern, 'i') //match all case
  let selector = {};
  let queryDate;
  selector.status = status;
  if (date != undefined) {
    queryDate = moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
    selector.saleDate = {
      $gte: queryDate
    }
  }else{
    queryDate = moment('','YYYY-MM-DD 00:00:00').toDate();
    selector.saleDate = {
      $gte: queryDate
    }
  }
  if (status == 'closed') {
    selector.status = {$in: ['closed', 'canceled']}
    selector.$or = [{
      _id: {
        $regex: reg
      }
    }, {
      '_table._tableLocation.name': {
        $regex: reg
      }
    }, {
      '_table.name': {
        $regex: reg
      }

    }]
  } else {
    selector.$or = [{
      '_table._tableLocation.name': {
        $regex: reg
      }
    }, {
      '_table.name': {
        $regex: reg
      }

    }]
  }
  if (!_.isEmpty(locations)) {
    selector.tableLocation = {
      $in: locations
    }
  }
  let restaurants = Restaurant.Collection.Sales.find(selector, {
    sort: {
      '_table.name': 1,
      '_table._tableLocation.name': 1
    },
    limit: limit
  });
  return restaurants;
}

Restaurant.Schema.Sales = new SimpleSchema({
  saleDate: {
    type: Date,
    label: "Sale Date"
  },
  statusDate: {
    type: Date,
    optional: true
  },
  paymentDate: {
    type: Date,
    optional: true
  },
  discount: {
    type: Number,
    label: "Discount",
    decimal: true,
    autoValue() {
      if (this.isInsert) {
        return 0;
      }
    }
  },
  description: {
    type: String,
    label: 'បរិយាយ',
    optional: true
  },
  subTotal: {
    type: Number,
    label: "SubTotal",
    decimal: true,
    optional: true
  },
  total: {
    type: Number,
    label: "Total",
    decimal: true,
    optional: true
  },
  paidAmount: {
    type: Number,
    decimal: true,
    optional: true

  },
  balanceAmount: {
    type: Number,
    decimal: true,
    optional: true
  },
  staffId: {
    type: String,
    label: "Staff",
    autoValue() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    }
    //regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  status: {
    type: String,
    label: "Status",
    optional: true
  },
  customerId: {
    type: String,
    label: "អតិថិជន",
    optional: true,
    autoform: {
      type: 'select',
      options() {
        var sub = Meteor.subscribe("customers");
        if (!sub.ready()) {
          IonLoading.show();
        } else {
          IonLoading.hide();
          let customers = Restaurant.Collection.Customers.find();
          let list = [];
          customers.forEach(function(customer) {
            let type = customer.type == 'officer' ? 'បុគ្គលិក' : 'ធម្មតា';
            list.push({
              label: `${customer.name}(${type})`,
              value: customer._id
            });
          });
          return list;
        }
      }
    }
  },
  numberOfCustomer:{
    type: Number,
    optional: true
  },
  tableLocation: {
    type: String,
    optional: true,
    label: 'ទីតាំងតុ',
    autoform: {
      type: 'select',
      options() {
        var sub = Meteor.subscribe("tableLocations");
        if (!sub.ready()) {
          IonLoading.show()
        } else {
          IonLoading.hide();
          let tableLocations = Restaurant.Collection.TableLocations.find();
          let list = []
          tableLocations.forEach(function(location) {
            list.push({
              label: `${location.name}`,
              value: location._id
            });
          });
          return list;
        }
      }
    }
  },
  tableId: {
    type: String,
    label: "តុ",
    autoform: {
      type: 'select',
      options() {
        let currentLocation = AutoForm.getFieldValue('tableLocation');
        let sub = Meteor.subscribe("tableInLocationId", currentLocation);
        if (!sub.ready()) {
          IonLoading.show();
        } else {
          IonLoading.hide();
          let list = [];
          let tables = Restaurant.Collection.Tables.find();
          tables.forEach(function(table) {
            list.push({
              label: `${table.name}`,
              value: table._id
            });
          });
          return list;
        }
      }
    }
  },
  exchangeRateId: {
    type: String,
    label: "Exchange Rate",
    optional: true
  },
  owedAmount: {
    type: Number,
    label: "Owed Amount",
    optional: true
  },
  _table: {
    type: Object,
    optional: true,
    blackbox: true
  },
  text: { //using this field for action-sheet event
    type: String,
    optional: true
  },
  _customer: {
    type: Object,
    optional: true,
    blackbox: true
  },
  _staff: {
    type: Object,
    optional: true,
    blackbox: true
  },
  _payment: {
    type: [Object],
    optional: true,
    blackbox: true
  },
  _exchangeRate: {
    type: Object,
    optional: true,
    blackbox: true
  },
  eop: {
    type: Object
  },
  'eop.status':{
    type: Boolean,
    autoValue(){
      if(this.isInsert){
        return false;
      }
    }
  },
  'eop._id':{
    type: String,
    optional:true
  },
  refId:{
    type: String,
    optional: true
  },
  vipcardId:{
    type:String,
    optional: true
  }
});
//search
Restaurant.Collection.Sales.attachSchema(Restaurant.Schema.Sales);
