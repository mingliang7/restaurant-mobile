Meteor.methods({
  findPaymentInvoice(id) {
    let content = []
    let data = {};
    data.header = {}
    data.content = {};
    data.footer = {};
    this.unblock();
    let company = Restaurant.Collection.Company.findOne();
    data.header.company = {
      khName: company.khName,
      enName: company.enName,
      phoneNumber: company.telephone,
      address: company.khAddress
    }
    let paymentId = Sale.State.get(id);
    if(_.isUndefined(paymentId)){
      paymentId = id;
    }
    let payment = Restaurant.Collection.Payments.findOne(paymentId);
    let sale = Restaurant.Collection.Sales.findOne(payment.saleId);
    let saleDetails = Restaurant.Collection.SaleDetails.find({
      saleId: sale._id
    });
    saleDetails.forEach(function(saleDetail) {
      content.push(saleDetail)
    });
    data.footer = {
      subTotal: sale.subTotal,
      discount: sale.discount,
      total: sale.total,
      paidAmount: payment.paidAmount,
      balanceAmount: payment.balanceAmount,
    }
    data.content = content;
    return data;
  }
});
