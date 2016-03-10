Meteor.methods({
    insertSale(selector) {
        var date = moment(selector.saleDate).format('YYMMDD');
        selector._id = idGenerator.genWithPrefix(Restaurant.Collection.Sales, date, 3);
        selector.text = selector._id;
        var customer = Restaurant.Collection.Customers.findOne({}, {sort: {_id: 1}});
        if (! customer) {
            throw new Meteor.Error("សូមមេត្តាបញ្ចូលឈ្មោះអតិថិជន");
        }
        selector.customerId = customer._id;

        var id = "";
        var company = Restaurant.Collection.Company.findOne();
        if (company != null) {
            id = company.baseCurrency;
        }
        var exchangeRate = Restaurant.Collection.ExchangeRates.findOne({
            base: id,
        }, {sort: {_id: -1, createdAt: -1}});
        if (! exchangeRate) {
            throw new Meteor.Error("សូមមេត្តាបញ្ចូលអត្រាប្តូរប្រាក់");
        }else{
            selector.exchangeRateId = exchangeRate._id;
        }


        var restaurantId = Restaurant.Collection.Sales.insert(selector);
        return restaurantId;
    },
    removeSaleIfNoSaleDetailExist(saleId){
        console.log(saleId);
        Meteor.defer(()=> {
            Meteor._sleepForMs(500);
            let saleDetails = Restaurant.Collection.SaleDetails.find({saleId: saleId});
            if (saleDetails.count() <= 0) {
                Restaurant.Collection.Sales.direct.remove(saleId);
            }
        });
    },
    transferSaleAndSaleDetails: function (saleDetailId, fromSaleId, toSaleId) {
        Restaurant.Collection.SaleDetails.update(saleDetailId, {$set: {saleId: toSaleId}});
        Meteor.defer(function () {
            // Meteor._sleepForMs(500);
            var saleDetails = Restaurant.Collection.SaleDetails.find({saleId: fromSaleId});
            if (saleDetails.count() > 0) {
                var set = {};
                var sale = Restaurant.Collection.Sales.findOne(fromSaleId);
                var discount = sale && sale.discount ? sale.discount : 0;
                var saleSubTotal = 0;
                saleDetails.forEach(function (saleDetail) {
                    saleSubTotal += parseFloat(saleDetail.amount);
                });
                var baseCurrencyId = Restaurant.Collection.Company.findOne().baseCurrency;
                var total = saleSubTotal * (1 - discount / 100);
                if (baseCurrencyId == "KHR") {
                    total = roundRielCurrency(total);
                }
                set.subTotal = saleSubTotal;
                set.total = total;
                set.owedAmount = total;
                set.transferOrSplit = true;
                Restaurant.Collection.Sales.direct.update(fromSaleId, {$set: set});

            }
            else {
                Restaurant.Collection.Sales.remove(fromSaleId);
            }
        });
    },
    cancelInvoice(saleId){
      return Restaurant.Collection.Sales.direct.update(saleId, {$set: {status: 'canceled'}});
    },
    cancelAndCopy(selector, currentSaleId){
      Meteor._sleepForMs(200);
      let newSaleId = Meteor.call('insertSale', selector);
      let currentSaleDetails = Restaurant.Collection.SaleDetails.find({saleId: currentSaleId});
      currentSaleDetails.forEach(function(saleDetail) {
        saleDetail.saleId = newSaleId;
        saleDetail._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, newSaleId, 2);
        saleDetail.isPrinting = true;
        Restaurant.Collection.SaleDetails.insert(saleDetail);
      });
      Meteor.defer(()=>{
        Meteor.call('cancelInvoice', currentSaleId);
      })
      return newSaleId;
    }
});
