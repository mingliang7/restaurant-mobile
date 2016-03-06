Template.restaurantSaleTableLocationShow.created = function() {
  let tableLocationId = Router.current().params.tableLocationId;
  Session.set('saleDetailObj', {}); //set saleDetailObj for order product
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('tableInLocationId', tableLocationId);
    this.subscribe = Meteor.subscribe("existSales");
  });
}

Template.restaurantSaleTableLocationShow.rendered = function() {
  let invoiceId = Session.get('invoiceId');
  if (!_.isUndefined(invoiceId)) {
    Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
    Session.set('invoiceId', undefined);
  }
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {}
}

Template.restaurantSaleTableLocationShow.helpers({
  tables() {
    let tableLocationId = Router.current().params.tableLocationId;
    return Restaurant.Collection.Tables.find({
      tableLocationId: tableLocationId
    }, {sort: {_id: 1, name: 1}});
  },
  location() {
    try {
      let tableLocationId = Router.current().params.tableLocationId;
      let location = Restaurant.Collection.Tables.findOne();
      return location._tableLocation.name;
    } catch (e) {

    }
  },
  saleHasSaleDetails(tableId){
    let sales = Restaurant.Collection.Sales.findOne({status: 'active', tableId: tableId});
    if(!_.isUndefined(sales)){
      return true;
    }
    return false;
  }
});

Template.restaurantSaleTableLocationShow.events({
  "click .action-sheet" (event, template) {
    Session.set('saleDetailObj', {}); //set saleDetailObj for order product
    let tableName = $(event.currentTarget).parents('.item').find('.table-name').text();
    let tableId = $(event.currentTarget).parents('.item').find('.table-id').text();
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
        let params = Router.current().params;
        Router.go(`/restaurant/sale/${params.tableLocationId}/table/${sales[index].tableId}/saleInvoice/${sales[index]._id}`);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  },
  "click .balanced" (event) {
    Session.set('saleDetailObj', {}); //set saleDetailObj for order product
    IonLoading.show();
    let tableLocationId = Router.current().params.tableLocationId;;
    let tableId = $(event.currentTarget).parents('.item').find('.table-id').text();
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
        Router.go(`/restaurant/sale/${tableLocationId}/table/${tableId}/checkout/${result}`);
      }
    })
  }
});
