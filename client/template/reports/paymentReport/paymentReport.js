Template.restaurantPaymentReport.onRendered(function() {
    $('[name="fromDate"]').datetimepicker();
    $('[name="toDate"]').datetimepicker();
});
Template.restaurantPaymentReport.helpers({
    customers() {
        return ReactiveMethod.call('getCustomerList');
    },
    status() {
        return [{
            value: "closed",
            label: "ទូរទាត់ហើយ"
        }, {
            value: "partial",
            label: "ជំពាក់"
        }]
    },
    users() {
        return ReactiveMethod.call('getUserList');
    }
});

Template.restaurantPaymentReportGen.helpers({
    data: function() {
        var query = Router.current().params.query;
        var call = Meteor.callAsync(query, 'getPaymentReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();
    },
    statusCanceled(status) {
        if (status == 'canceled') {
            return true;
        }
    },
    partial(status, saleDate, paymentDate) {
        let currentSaleDate = moment(saleDate).format('YYYY-MM-DD');
        let currentPaymentDate = moment(paymentDate).format('YYYY-MM-DD')
        if (status == 'partial') {
            return true;
        }
        if (currentSaleDate < currentPaymentDate) {
            return true;
        }
        return false;
    },

    no(index) {
        return index + 1;
    },
    getCustomerName(id) {
        try {
            let customer = ReactiveMethod.call('findOneRecord', 'Restaurant.Collection.Customers', id);
            return customer.name;
        } catch (e) {

        }
    },
    convertExchange(value) {
        try {
            let exchange = Restaurant.Collection.ExchangeRates.findOne({}, {
                sort: {
                    _id: -1
                }
            });
            if (exchange.base == 'KHR') {
                return numeral(value / exchange.rates[0].rate).format('0,0.00') + '$';
            }
            return numeral(value * exchange.rates[0].rate).format('0,0') + '៛';
        } catch (e) {

        }
    }
});

AutoForm.hooks({
    restaurantSaleReport: {}
});
