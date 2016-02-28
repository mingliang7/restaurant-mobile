Template.restaurantSaleTableSaleInvoice.created = function () {
    let saleId = Router.current().params.invoiceId;
    Session.set('saleDetailLimited', 5) // using for limit
    Session.set('detachSaleDetailObj', {}) //using for detach sale detail
    this.autorun(() => {
        this.subscribe = Meteor.subscribe("sale", saleId);
        this.subscribe = Meteor.subscribe("saleDetailCount", saleId);
        this.subscribe = Meteor.subscribe("saleDetails", Router.current().params.invoiceId, Session.get('saleDetailLimited'));
    });
};

Template.restaurantSaleTableSaleInvoice.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
    } catch (e) {

    }
}

Template.restaurantSaleTableSaleInvoice.helpers({
    invoiceNumber() {
        let invoiceId = Router.current().params.invoiceId;
        return `វិក័យប័ត្រលេខ: ${invoiceId}`;
    },
    saleDetails() {
        let limit = Session.get('saleDetailLimited');
        let saleId = Router.current().params.invoiceId;
        return Restaurant.Collection.SaleDetails.find({
            saleId: saleId
        }, {
            sort: {
                _id: 1
            },
            limit: limit
        });
    },
    saleInvoice() {
        return Restaurant.Collection.Sales.findOne();
    },
    goToPayment() {
        let params = Router.current().params;
        return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/payment`;
    },
    hasMore() {
        let currentLimited = Session.get('saleDetailLimited');
        let counts = Counts.get('saleDetailCount');
        debugger
        return currentLimited < counts
    }
});
Template.restaurantSaleTableSaleInvoice.events({
    "click .loadMore" () {
        let saleId = Router.current().params.invoiceId;
        let limit = Session.get('saleDetailLimited') + 5;
        Session.set('saleDetailLimited', limit);
        let sub = Meteor.subscribe("saleDetails", saleId, limit);

    }
});

Template._sale_invoice_tabs.helpers({
    goToCheckout() {
        Session.set('saleDetailObj', {});
        let params = Router.current().params;
        return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
    }
});

Template.saleDetail.events({
    'click .remove-sale-detail' () {
        let data = this;
        IonPopup.confirm({
            title: 'តើអ្នកត្រូវការលុបឬ?',
            template: `លុបទំនិញ ${data._product._category.name}${data._product.name}?`,
            onOk: () => {
                Meteor.call('removeSaleDetail', data._id, (err, result) => {
                    if (err) {
                        Bert.alert(`លុបមិនបានជោគជ័យ! ${data._product.name}`, 'danger', 'growl-bottom-right', 'fa-remove')
                    } else {
                        Bert.alert(`លុបបានជោគជ័យ! ${data._product.name}`, 'success', 'growl-bottom-right', 'fa-check')
                    }
                });
            },
            onCancel: function () {
                Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
            }
        });
    },
    'click .detach' (e) {
        let detachObj = Session.get('detachSaleDetailObj');
        let currentProp = $(e.currentTarget).prop('checked');
        let currentDate = $('.saleDate').text().trim();
        if (currentProp) {
            detachObj[this._id] = this._id
            detachObj[this._id] = {
                saleDate: currentDate,
                oldSaleId: this.saleId
            }
        } else {
            delete detachObj[this._id]
        }
        Session.set('detachSaleDetailObj', detachObj);
    }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSale
Template.tableHeader.helpers({
    goToEditSale() {
        let params = Router.current().params;
        return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSale`;
    }
})

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editDiscount

Template.saleInvoiceTotal.helpers({
    multiply: function (val1, val2, id) {
        debugger;
        if (val1 != null && val2 != null) {
            var value = (val1 / val2);
            if (id != null && id == "KHR") {
                value = roundRielCurrency(value);
                return numeral(value).format('0,0.00');
            }
            return numeral(value).format('0,0.00');
        }
    },
    exchangeRate: function () {
        let invoiceId = Router.current().params.invoiceId;
        var sale = Restaurant.Collection.Sales.findOne(invoiceId);
        if (sale != null) {
            var selector = {
                _id: sale.exchangeRateId
            };
            return ReactiveMethod.call('findOneRecord', 'Restaurant.Collection.ExchangeRates', selector, {});
            // return Restaurant.Collection.ExchangeRates.findOne(sale.exchangeRateId);
        } else {
            var id = "";
            var company = Restaurant.Collection.Company.findOne();
            if (company != null) {
                id = company.baseCurrency;
            }
            var selector = {
                base: id
            };
            var option = {
                sort: {
                    _id: -1,
                    createdAt: -1
                }
            };
            return ReactiveMethod.call('findONeRecord', 'Restaurant.Collection.ExchangeRates', selector, option);
            /*return Restaurant.Collection.ExchangeRates.findOne({
             base: id,
             }, {sort: {_id: -1, createdAt: -1}});*/
        }

    },
    goToEditDiscount() {
        let params = Router.current().params;
        return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editDiscount`;
    },
    saleInvoice() {
        return Restaurant.Collection.Sales.findOne();
    }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSaleDetail/:saleDetailId

Template.saleDetail.helpers({
    goToSaleDetailEdit() {
        let params = Router.current().params;
        return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSaleDetail/${this._id}`;
    }
})

Template._sale_invoice_tabs.helpers({
    hasDetachSaleDetail() {
        let saleDetailObj = Session.get('detachSaleDetailObj');
        if (!_.isEmpty(saleDetailObj)) {
            return true
        }
        return false;
    }
});


Template._sale_invoice_tabs.events({
    'click .sale-print'(){
        let invoiceId = Router.current().params.invoiceId;
        Router.go('/restaurant/sale-printer/' + invoiceId);
    },
    'click .detachSaleDetail' () {
        let params = Router.current().params;
        let detachObj = Session.get('detachSaleDetailObj');
        IonPopup.confirm({
            title: 'បញ្ជាក់',
            template: `តើអ្នកពិតជាចង់បំបែកវិក័យប័ត្រ?`,
            onOk: () => {
                IonLoading.show()
                Meteor.call('detachSaleDetail', params.tableId, params.tableLocationId, detachObj, (err, result) => {
                    if (err) {
                        Bert.alert(`បំបែកវិក័យប័ត្រមិនបានជោគជ័យ!`, 'danger', 'growl-bottom-right', 'fa-remove')
                        IonLoading.hide()
                    } else {
                        IonLoading.hide()
                        Bert.alert(`បំបែកវិក័យប័ត្របានជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
                        Session.set('detachSaleDetailObj', {});
                    }
                });
            },
            onCancel: function () {
                Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
            }
        });
    }
});
