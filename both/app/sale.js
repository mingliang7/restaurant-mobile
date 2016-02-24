Sale = {
  sumSaleDetail(saleId) {
    let subTotal = 0;
    let total;
    let index = 0;
    let sale = Restaurant.Collection.Sales.findOne(saleId);
    let text = sale.text;
    let flag = sale.text == sale._id;
    if (flag) {
      text = `${sale.text} | `;
    }
    let saleDetails = Restaurant.Collection.SaleDetails.find({
      saleId: saleId
    });
    saleDetails.forEach((saleDetail) => {
      if (index < 2) {
        if (flag) {
          text += `${Restaurant.Collection.Products.findOne(saleDetail.productId).name},`
        }
      }
      index++;
      subTotal += saleDetail.amount;
    });
    total = subTotal * (1 - sale.discount / 100);
    Restaurant.Collection.Sales.direct.update(saleId, {
      $set: {
        total: total,
        subTotal: subTotal,
        paidAmount: 0,
        balanceAmount: total,
        text: text
      }
    });
  }
}
