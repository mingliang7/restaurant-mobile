Meteor.methods({
    findPaymentInvoice(id) {
        let content = [];
        let data = {};
        data.header = {};
        data.content = {};
        data.footer = {};
        this.unblock();
        let company = Restaurant.Collection.Company.findOne();
        data.header.company = {
            khName: company.khName,
            enName: company.enName,
            phoneNumber: company.telephone,
            address: company.khAddress
        };
        let paymentId = Sale.State.get(id);
        if (_.isUndefined(paymentId)) {
            paymentId = id;
        }
        let payment = Restaurant.Collection.Payments.findOne(paymentId);
        let sale = Restaurant.Collection.Sales.findOne(payment.saleId);
        sale.saleDate = moment(sale.saleDate).format('DD-MM-YY HH:mm');
        let saleDetails = Restaurant.Collection.SaleDetails.find({
            saleId: sale._id
        });
        let i = 1;
        saleDetails.forEach(function (saleDetail) {
            saleDetail.order = i;
            saleDetail.amount = numeral(saleDetail.amount).format('0,0');
            i++;
            content.push(saleDetail)
        });
        var totalConverts = [];
        sale._exchangeRate.rates.forEach(function (ex) {
            var totalConvert=parseFloat(sale.total)/parseFloat(ex.rate);
            ex.total = numeral(totalConvert).format('0,0.00');
            totalConverts.push(ex);
        });
        data.footer = {
            subTotal: numeral(sale.subTotal).format('0,0'),
            discount: numeral(sale.discount).format('0,0'),
            total: numeral(sale.total).format('0,0'),
            paidAmount: numeral(payment.paidAmount).format('0,0'),
            balanceAmount: numeral(payment.balanceAmount).format('0,0'),
            totalConverts: totalConverts
        };
        data.content = content;
        data.sale = sale;
        return data;
    },
    findSaleInvoice(saleId) {
        let content = [];
        let data = {};
        data.header = {};
        data.content = {};
        data.footer = {};
        this.unblock();
        let company = Restaurant.Collection.Company.findOne();
        data.header.company = {
            khName: company.khName,
            enName: company.enName,
            phoneNumber: company.telephone,
            address: company.khAddress
        };
        let sale = Restaurant.Collection.Sales.findOne(saleId);
        sale.saleDate = moment(sale.saleDate).format('DD-MM-YY HH:mm');
        let saleDetails = Restaurant.Collection.SaleDetails.find({
            saleId: sale._id
        });
        let i = 1;
        saleDetails.forEach(function (saleDetail) {
            saleDetail.order = i;
            saleDetail.amount = numeral(saleDetail.amount).format('0,0');
            i++;
            content.push(saleDetail)
        });
        var totalConverts = [];
        sale._exchangeRate.rates.forEach(function (ex) {
            var totalConvert=parseFloat(sale.total)/parseFloat(ex.rate);
            ex.total = numeral(totalConvert).format('0,0.00');
            totalConverts.push(ex);
        });
        data.footer = {
            subTotal: numeral(sale.subTotal).format('0,0'),
            discount: numeral(sale.discount).format('0,0'),
            total: numeral(sale.total).format('0,0'),
            totalConverts: totalConverts
        };
        data.content = content;
        data.sale = sale;
        return data;
    }
});
