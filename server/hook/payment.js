Restaurant.Collection.Payments.before.insert((userId, doc) => {
  if(doc.balanceAmount == 0){
    doc.status = 'closed';
  }else{
    doc.status = 'partial';
  }
});

Restaurant.Collection.Payments.after.insert((userId, doc)=>{
  Meteor.defer(()=>{
    updateSale(doc);
  });
})




var updateSale = function (doc, update, oldDoc) {
  var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
  var paidAmount, balanceAmount, selector;
  if (update) {
    console.log('update');
    if (oldDoc.paidAmount > doc.paidAmount) {
      balanceAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = sale.paidAmount - (oldDoc.paidAmount - doc.paidAmount);
    } else {
      balanceAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = sale.paidAmount + (doc.paidAmount - oldDoc.paidAmount);
    }
  } else {
    console.log('insert');
    paidAmount = sale.paidAmount + doc.paidAmount;
    balanceAmount = sale.balanceAmount - doc.paidAmount;
  }

  if (balanceAmount == 0) {
    selector = {
      $set: {
        status: 'closed',
        statusDate: doc.paymentDate,
        paidAmount: paidAmount,
        balanceAmount: balanceAmount
      }
    }
  } else {
    selector = {
      $set: {
        status: 'active',
        statusDate: sale.saleDate,
        paidAmount: paidAmount,
        balanceAmount: balanceAmount
      }
    }
  }
  return Restaurant.Collection.Sales.update({
    _id: doc.saleId
  }, selector);
};
