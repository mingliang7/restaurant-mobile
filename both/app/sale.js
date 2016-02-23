Sale = {
  sumSaleDetail(saleId) {
      let subTotal = 0;
      let total;
      let sale = Restaurant.Collection.Sales.findOne(saleId);
      let saleDetails = Restaurant.Collection.SaleDetails.find({
        saleId: saleId
      });
      saleDetails.forEach((saleDetail) => {
        subTotal += saleDetail.amount;
      });
      total = subTotal * (1 - sale.discount/100);
      Restaurant.Collection.Sales.direct.update(saleId, {$set: {total: total, subTotal: subTotal}});
  }
}
