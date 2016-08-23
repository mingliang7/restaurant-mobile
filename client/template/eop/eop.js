 Tracker.autorun(function() {
     if (Session.get('fetchMaterialInSaleDetailsSelector')) {
         let selector = Session.get('fetchMaterialInSaleDetailsSelector');
         console.log(selector);
         Meteor.call('fetchMaterialInSaleDetails', selector, function(err, result) {
             Session.set('fetchMaterialInSaleDetailsData', result);
         });
     }
 });
 let tmpCheckStock = new Mongo.Collection(null);
 let saleItems = new Mongo.Collection(null);
 Template.restaurantEop.created = function() {

 };

 Template.restaurantEop.rendered = function() {
     Session.set('fetchMaterialInSaleDetailsSelector', {
         status: {
             $in: ['closed', 'partial']
         },
         "eop.status": false
     });
 };

 Template.restaurantEop.onDestroyed(function() {
     Session.set('fetchMaterialInSaleDetailsSelector', undefined);
     Session.set('fetchMaterialInSaleDetailsData', undefined);
     tmpCheckStock.remove({});
     saleItems.remove({});
 });
 Template.restaurantEop.helpers({
     sales() {
         let index = 1;
         let sales = Session.get('fetchMaterialInSaleDetailsData') || [];
         sales.forEach(function(sale) {
             sale.index = index;
             tmpCheckStock.insert(sale);
             index++;
         });
         return sales;
     },
     checkIndex(index) {
         return index == 1;
     },
     saleId(saleId) {
         return saleItems.findOne({saleId: saleId}) ? true : false;
     },
     isSaleNotExist(){
       return _.isEmpty(Session.get('fetchMaterialInSaleDetailsData')) ? true : false;
     }
 });
 Template.restaurantEop.events({
     'change .reduceAllInvoice' (event, instance) {
         if ($(event.currentTarget).prop('checked')) {
             let saleId = $(event.currentTarget).parents('.card').find('.saleId').text().trim();
             let saleObj = tmpCheckStock.findOne(saleId);
             saleObj.data.forEach(function(sale) {
                 saleItems.insert(sale);
             });
         }else{
           saleItems.remove({});
         }
         console.log(saleItems.find().fetch());
     },
     'change .current-invoice' (event, instance) {
         let currentInvoiceId = $(event.currentTarget).parents('.sale-obj-parents').find('.sale-obj-id').text().trim();
         let saleId = $(event.currentTarget).parents('.card').find('.saleId').text().trim();
         let saleObj = tmpCheckStock.findOne(saleId);
         if ($(event.currentTarget).prop('checked')) {
             saleObj.data.forEach(function(sale) {
                 if (sale.saleId == currentInvoiceId) {
                     saleItems.insert(sale);
                 }
             });
         } else {
             saleItems.remove({
                 saleId: currentInvoiceId
             });
         }
         console.log(saleItems.find().fetch());
     },
     'click .save'(event,instance){
       let items = saleItems.find().fetch();
       if(items.length > 0){
         IonPopup.confirm({
           title: 'បញ្ជាក់',
           template: `ធ្វើការកាត់កងឥឡូវ?`,
           onOk: () => {
             IonLoading.show();
             Meteor.call('reducingStock', {data: items}, (err, result) => {
               if (err) {
                 Bert.alert('ផ្ទេរមិនបានជោគជ័យ', 'danger', 'growl-bottom-right', 'fa-info');
                 IonLoading.hide();
                 saleItems.remove({});
               } else {
                 IonLoading.hide();
                 saleItems.remove({});
                 Bert.alert(`កាត់កងបានជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check');
                 Router.go('/restaurant/data');
               }
             });
           },
           onCancel: function() {

           }
         });
       }
     }
 });
