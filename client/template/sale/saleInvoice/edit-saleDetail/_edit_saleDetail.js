Template._editSaleDetail.helpers({
  saleDetail() {
    let id = Template.instance().data.id;
    let saleDetail = Restaurant.Collection.SaleDetails.findOne({_id: `${id}`});
    console.log(saleDetail);
    return saleDetail;
  }
});


Template._editSaleDetail.events({
  "keyup [name='quantity']"(event, template){
    let currentQty = $("[name='quantity']").val();
    let currentPrice = $('[name="price"]').val();
    let totalAmount;
    if(currentQty == ''){
      $("[name='quantity']").val('1');
      $("[name='amount']").val(currentPrice);
    }
    $('[name="amount"]').val(parseFloat(currentPrice) * parseFloat(currentQty));
  }
});
