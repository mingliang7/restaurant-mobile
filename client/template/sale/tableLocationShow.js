Template.restaurantSaleTableLocationShow.created = function() {
  let tableLocationId = Router.current().params.tableLocationId;
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('tableInLocationId', tableLocationId);
  });
}

Template.restaurantSaleTableLocationShow.rendered = function() {
  let invoiceId = Session.get('invoiceId');
  if(!_.isUndefined(invoiceId)){
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
    });
  },
  location() {
    try {
      let tableLocationId = Router.current().params.tableLocationId;
      let location = Restaurant.Collection.Tables.findOne();
      return location._tableLocation.name;
    } catch (e) {

    }
  }
});

Template.restaurantSaleTableLocationShow.events({
  "click .action-sheet" (event, template) {
    let tableName = $(event.currentTarget).parents('.item').find('.table-name').text();
    IonActionSheet.show({
      titleText: `ជម្រើសសម្រាប់វិក័យប័ត្រតុលេខ ${tableName}`,
      buttons: [{
        text: 'Share <i class="icon ion-share"></i>'
      }, {
        text: 'Move <i class="icon ion-arrow-move"></i>'
      }, ],
      destructiveText: 'ផ្ទេរវិក័យប័ត្រ',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Shared!');
        }
        if (index === 1) {
          console.log('Moved!');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  },
  "click .balanced" (event) {
    IonLoading.show();
    let tableLocationId = Router.current().params.tableLocationId;;
    let tableId = $(event.currentTarget).parents('.item').find('.table-id').text();
    let selector = {}
    selector.saleDate = new Date();
    selector.status = "unsaved";
    selector.tableId = tableId;
    Meteor.call('insertSale', selector, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        IonLoading.hide();
        Router.go(`/restaurant/sale/${tableLocationId}/table/${tableId}/checkout/${result}`);
      }
    })
  }
});
