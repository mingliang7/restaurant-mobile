class SaleMethod {
  static sumSaleDetail(saleId) {
    let total = 0;
    let saleDetails = Restaurant.Collection.SaleDetails.find({
      saleId: saleId
    });
    saleDetails.forEach((saleDetail) => {
      
    });
  }
}
