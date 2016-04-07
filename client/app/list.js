/**
 * List
 */

var getCategoryIdsForExclusion = function(array, categories) {
  if (categories != null) {
    categories.forEach(function(c) {
      array.push(c._id);
      var cats = Restaurant.Collection.Categories.find({
        parentId: c._id
      });
      if (cats != null) {
        return getCategoryIdsForExclusion(array, cats);
      }
    });
  }
  return array;
};
var pushToList = function(array, obj) {
  var str = "";
  for (var i = 0; i < obj.level * 3; i++) {
    str += "&nbsp;";
  }
  array.push({
    label: Spacebars.SafeString(str + obj.name),
    value: obj._id
  });
  return array;
};

var getCategoryList = function(selector, array, categories, alreadyUse) {
  if (categories != null) {
    categories.forEach(function(c) {
      array = pushToList(array, c);
      /* var str = "";
       for (var i = 0; i < c.level * 3; i++) {
       str += "&nbsp;";
       }
       array.push({
       label: Spacebars.SafeString(str + (c.level + 1) + '. ' + c.name),
       value: c._id
       });*/
      alreadyUse.push(c._id);
      selector.parentId = c._id;
      var cats = Restaurant.Collection.Categories.find(selector);
      if (cats != null) {
        return getCategoryList(selector, array, cats, alreadyUse);
      }
    });
  }
  return array;
};

Restaurant.ListForReport = {
  locations: function() {
    var list = [{
      label: "All",
      value: ""
    }];
    var branchIdSession = Session.get('branchIds');
    var branchIds = [];
    if (branchIdSession != null) {
      branchIds = branchIdSession;
    } else {
      var userId = Meteor.userId();
      branchIds = Meteor.users.findOne(userId).rolesBranch;
    }
    Restaurant.Collection.Locations.find({
      branchId: {
        $in: branchIds
      }
    }).forEach(function(obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  }
};


Restaurant.List = {
  customerType() {
    return [{
      label: 'ធម្មតា',
      value: 'normal'
    }, {
      label: 'បុគ្គលិក',
      value: 'officer'
    }];
  },
  currency: function() {
    var list = [];
    Restaurant.Collection.Currency.find({}).forEach(function(obj) {
      list.push({
        label: obj._id,
        value: obj._id
      });
    });
    return list;
  },
  tableLocations: function() {
    // var list = [{
    //     label: "(Select One)",
    //     value: ""
    // }];
    var list = [];
    Restaurant.Collection.TableLocations.find({
      branchId: Session.get('currentBranch')
    }).forEach(function(obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  },
  locations: function() {
    var list = [];
    Restaurant.Collection.Locations.find({
      branchId: Session.get('currentBranch')
    }).forEach(function(obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  },
  gender: function() {
    return [{
      label: 'Male',
      value: 'M'
    }, {
      label: 'Female',
      value: 'F'
    }];
  },
  status: function() {
    return [{
      label: "Enable",
      value: "enable"
    }, {
      label: "Disable",
      value: "disable"
    }];
  },
  category: function() {
    var list = [];
    Restaurant.Collection.Categories.find({}, {
      sort: {
        name: 1
      }
    }).forEach(function(obj) {
      list.push({
        label: obj.name,
        value: obj._id
      });
    });
    return list;

  },
  unit: function() {
    var list = [];
    Restaurant.Collection.Units.find({}, {
      sort: {
        name: 1
      }
    }).forEach(function(obj) {
      list.push({
        label: obj.name,
        value: obj._id
      });
    });
    return list;
  },
  customerList: function() {
    var list = [];
    var branchIdSession = Session.get('currentBranch');
    var selector = {};
    if (branchIdSession != null) selector.branchId = branchIdSession;
    Restaurant.Collection.Customers.find(selector).forEach(function(obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  },
  supplierList: function() {
    var list = [{
      label: "(Select One)",
      value: ""
    }];
    var branchIdSession = Session.get('currentBranch');
    var selector = {};
    if (branchIdSession != null) selector.branchId = branchIdSession;
    Restaurant.Collection.Suppliers.find(selector).forEach(function(obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  },
  saleList: function() {
    var list = [{
      label: "(Select One)",
      value: ""
    }];
    var customerSession = Session.get('customerId');
    var branchIdSession = Session.get('currentBranch');
    var selector = {};
    selector.status = "Owed";
    selector.transactionType = "Sale";
    if (branchIdSession != null) selector.branchId = branchIdSession;
    if (customerSession != null) selector.customerId = customerSession;
    Restaurant.Collection.Sales.find(selector).forEach(function(obj) {
      var payment = Restaurant.Collection.Payments.findOne({
        saleId: obj._id,
        branchId: branchIdSession
          //balanceAmount: {$gt: 0}
      }, {
        sort: {
          _id: -1,
          paymentDate: -1
        }
      });
      if (payment == null) {
        list.push({
          label: obj._id + ' : ' + obj._customer.name,
          value: obj._id
        });
      } else if (payment.balanceAmount > 0) {
        list.push({
          label: obj._id + ' : ' + obj._customer.name,
          value: obj._id
        });
      }

    });
    return list;

  },
  purchaseList: function() {
    var list = [{
      label: "(Select One)",
      value: ""
    }];
    var supplierSession = Session.get('supplierId');
    var branchIdSession = Session.get('currentBranch');
    var selector = {};
    selector.status = "Owed";
    selector.transactionType = "Purchase";
    if (branchIdSession != null) selector.branchId = branchIdSession;
    if (supplierSession != null) selector.supplierId = supplierSession;
    debugger;
    Restaurant.Collection.Purchases.find(selector).forEach(function(obj) {
      var payment = Restaurant.Collection.Payments.findOne({
        purchaseId: obj._id,
        branchId: branchIdSession
          //balanceAmount: {$gt: 0}
      }, {
        sort: {
          _id: -1,
          paymentDate: -1
        }
      });
      if (payment == null) {
        list.push({
          label: obj._id + ' : ' + obj._supplier.name,
          value: obj._id
        });
      } else if (payment.balanceAmount > 0) {
        list.push({
          label: obj._id + ' : ' + obj._supplier.name,
          value: obj._id
        });
      }


    });
    return list;

  },
  getStaffListByBranchId: function(selectOne) {
    var list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }
    var branchId = Session.get('currentBranch');
    Restaurant.Collection.Staffs.find({
      branchId: branchId
    }).forEach(function(obj) {
      list.push({
        label: obj._id + ' : ' + obj.name,
        value: obj._id
      });
    });
    return list;
  },
  backupAndRestoreTypes: function() {
    return [{
      value: '',
      label: 'Select One'
    }, {
      value: 'Setting',
      label: 'Setting'
    }, {
      value: 'Default',
      label: 'Default'
    }, {
      value: 'Setting,Default',
      label: 'Setting And Default'
    }];
  },
  getNoteList: function() {
    var list = [];
    var notes = Restaurant.Collection.Notes.find();
    if (notes) {
      notes.forEach(function(note) {
        list.push({
          label: note.name,
          value: note.name
        });
      });
    }
    return list;
  },
  stockType: function() {
    return [{
      label: "Purchase",
      value: "order"
    }, {
      label: "Adjustment",
      value: "adjustment"
    }];
  },
  productType: function() {
    return [{
      label: "លក់",
      value: "sale"
    }, {
      label: "វត្ថុធាតុដើម",
      value: "material"
    }];
  },
  chairAmount() {
    let list = [];
    for (let i = 0; i <= 15; i++) {
      list.push({
        label: `${i}`,
        value: i
      });
    }
    return list;
  },
  roles() {
    return [{
      label: 'អ្នកគិតលុយ',
      value: 'cashier'
    }, {
      label: 'អ្នកកំណត់សិទ្ធ',
      value: 'setting'
    }, {
      label: 'អ្នកលក់',
      value: 'seller'
    }]
  },

}
