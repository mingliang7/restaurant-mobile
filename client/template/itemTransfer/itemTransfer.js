Template.restaurantItemTransfer.onRendered(function () {
    /* $("#from-sortable-sale, #to-sortable-sale").sortable({
     connectWith: ".connectedSortable"
     }).disableSelection();*/
    Session.set("fromSaleIdSession", undefined);
    Session.set("toSaleIdSession", undefined);

   /* $('#from-sale-id').select2();
    $('#to-sale-id').select2();*/
    $('#from-sortable-sale').sortable({  // begin sortable
        connectWith: '#to-sortable-sale',
        receive: function (event, ui) {  // begin receive
            var id = $(ui.item).attr('id');
            var fromSaleId = Session.get('fromSaleIdSession');
            var toSaleId = Session.get('toSaleIdSession');
            Meteor.call('transferSaleAndSaleDetails', id, toSaleId, fromSaleId, function (er, re) {
                if (er) alertify.error(er.message);
            });
        }
    });
    $('#to-sortable-sale').sortable({  // begin sortable
        connectWith: '#from-sortable-sale',
        receive: function (event, ui) {  // begin receive
            var id = $(ui.item).attr('id');
            var fromSaleId = Session.get('fromSaleIdSession');
            var toSaleId = Session.get('toSaleIdSession');
            var selector = {saleId: toSaleId};
            Meteor.call('transferSaleAndSaleDetails', id, fromSaleId, toSaleId, function (er, re) {
                if (er) alertify.error(er.message);
            });

        }
    });

});
Template.restaurantItemTransfer.helpers({
    fromSales: function () {
        var selector = {status: "active"};
        var toSaleId = Session.get('toSaleIdSession');
        if (toSaleId) selector._id = {$ne: toSaleId};
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Sales', selector, {});
       // return Restaurant.Collection.Sales.find(selector);
    },
    toSales: function () {
        var selector = {status: "active"};
        var fromSaleId = Session.get('fromSaleIdSession');
        if (fromSaleId) selector._id = {$ne: fromSaleId};
         return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Sales', selector, {});
        //return Restaurant.Collection.Sales.find(selector);
    },
    fromSaleDetails: function () {
        var fromSaleId = Session.get('fromSaleIdSession');
        if (fromSaleId) {
            var selector = {saleId: fromSaleId};
            //return Restaurant.Collection.SaleDetails.find(selector);
            return ReactiveMethod.call('findRecords', 'Restaurant.Collection.SaleDetails', selector, {});
        } else {
            return [];
        }

    },
    toSaleDetails: function () {
        var toSaleId = Session.get('toSaleIdSession');
        if (toSaleId) {
            var selector = {saleId: toSaleId};
            //return Restaurant.Collection.SaleDetails.find(selector);
             return ReactiveMethod.call('findRecords', 'Restaurant.Collection.SaleDetails', selector, {});
        } else {
            return [];
        }
    }
});
Template.restaurantItemTransfer.events({
    'change #from-sale-id': function (e) {
        var fromSaleId = $(e.currentTarget).val();
        if (fromSaleId == null || fromSaleId == "") {
            Session.set('fromSaleIdSession', null);
        } else {
            Session.set('fromSaleIdSession', fromSaleId);
        }
    },
    'change #to-sale-id': function (e) {
        var toSaleId = $(e.currentTarget).val();
        if (toSaleId == null || toSaleId == "") {
            Session.set('toSaleIdSession', null);
        } else {
            Session.set('toSaleIdSession', toSaleId);
        }
    }
});
