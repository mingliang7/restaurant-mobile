
Template.restaurantSelectTable.created = function() {
  Session.set('saleDetailObj', {}); //set saleDetailObj for order product
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("existSales");
  });
}


Template.restaurantSelectTable.rendered = function() {
  let invoiceId = Session.get('invoiceId');
  if (!_.isUndefined(invoiceId)) {
    Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
    Session.set('invoiceId', undefined);
  }
  Session.set('tableLocationFilter', {});
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    })
  } catch (e) {

  }
}
Template.restaurantSelectTable.helpers({
  tables() {
    let arr = [];
    let locations = Session.get('tableLocationFilter');
    for (let k in locations) {
      arr.push(locations[k]);
    }

    if (arr.length > 0) {
      return Restaurant.Collection.Tables.find({
        tableLocationId: {
          $nin: arr
        }
      });
    }
    return Restaurant.Collection.Tables.find();
  },
  locations() {
    return Restaurant.Collection.TableLocations.find();
  },
  saleHasSaleDetails(tableId) {
    let sales = Restaurant.Collection.Sales.findOne({
      status: 'active',
      tableId: tableId
    });
    if (!_.isUndefined(sales)) {
      return true;
    }
    return false;
  }
})

Template.restaurantSelectTable.events({
  "click .location" (event) {
    let currentLocation = Session.get("tableLocationFilter");
    if (! $(event.currentTarget).prop('checked')) {
      currentLocation[this._id] = this._id
    } else {
      delete currentLocation[this._id]
    }
    Session.set('tableLocationFilter', currentLocation);
  },
  'click .new-order'(){
    Session.set('saleDetailObj', {}); //set saleDetailObj for order product
    IonLoading.show();
    let tableLocationId = this.tableLocationId;;
    let tableId = this._id;
    let selector = {};
    selector.saleDate = new Date();
    selector.status = "active";
    selector.tableId = tableId;
    selector.tableLocation = tableLocationId;
    Meteor.call('insertSale', selector, (err, result) => {
      if (err) {
        Bert.alert(err.message,'danger', 'growl-bottom-right');
        IonLoading.hide();
      } else {
        IonLoading.hide();
        Session.set('invoiceId', result);
        Router.go(`/restaurant/saleList/location/${tableLocationId}/table/${tableId}/checkout/${result}`);
      }
    })
  },
  'click .current-order'(){
    let sale = Restaurant.Collection.Sales.findOne({
      status: 'active',
      tableId: this._id
    });
    Router.go(`/restaurant/saleList/location/${this.tableLocationId}/table/${this._id}/checkout/${sale._id}`);
  },
  "click .action-sheet" (event, template) {
    Session.set('saleDetailObj', {}); //set saleDetailObj for order product
    let data = this;
    let tableName = this.name;
    let tableId = this._id;
    var sales = Restaurant.Collection.Sales.find({status: 'active', tableId: tableId, paidAmount: 0}).fetch();
    IonActionSheet.show({
      titleText: `ជម្រើសសម្រាប់វិក័យប័ត្រតុលេខ ${tableName}`,
      buttons: sales,
      // destructiveText: 'ផ្ទេរវិក័យប័ត្រ',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        Router.go(`/restaurant/sale/${data.tableLocationId}/table/${sales[index].tableId}/saleInvoice/${sales[index]._id}`);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  }
});
