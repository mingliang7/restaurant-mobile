Restaurant.Collection.Payments.before.insert((userId, doc) => {
  let prefix = `${doc.saleId}`;
  let currentId = doc._id;
  doc._id = idGenerator.genWithPrefix(Restaurant.Collection.Payments, prefix, 2);
  Sale.State.set(currentId, doc._id);
  if (doc.paidAmount >= doc.dueAmount) {
    doc.status = 'closed';
    doc.truelyPaid = doc.dueAmount
  } else {
    doc.status = 'partial';
    doc.truelyPaid = doc.paidAmount;
  }
});

Restaurant.Collection.Payments.after.insert((userId, doc) => {
  Meteor.defer(() => {
    if(doc.discount){
      let exactPaid = doc.truelyPaid / (1 - (doc.discount/100));
      doc.paidAmount = exactPaid;
    }else{
      doc.paidAmount = doc.truelyPaid
    }
    updateSale(doc);
  });
  Meteor.defer(()=>{
    Meteor.call('setPrintToFalse', doc.saleId);
  })
})
Restaurant.Collection.Payments.after.remove((userId, doc) => {
  Meteor.defer(() => {
    removePaymentFromSale(doc);
  });
})

//remove
var removePaymentFromSale = function(doc) {
  var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
  var paidAmount = sale.paidAmount - doc.truelyPaid;
  var balanceAmount = sale.balanceAmount + doc.truelyPaid;
  var status = '';
  Restaurant.Collection.Sales.direct.update({
    _id: sale._id
  }, {
    $set: {
      status: 'active',
      statusDate: sale.saleDate,
      paidAmount: paidAmount,
      balanceAmount: balanceAmount
    }
  });
  closedSaleDetail('unsaved', doc.saleId);
};




//update and insert
var updateSale = function(doc, update, oldDoc) {
  var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
  var paidAmount, balanceAmount, selector;
  if (update) {
    if (oldDoc.paidAmount > doc.paidAmount) {
      balanceAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = sale.paidAmount - (oldDoc.paidAmount - doc.paidAmount);
    } else {
      balanceAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = sale.paidAmount + (doc.paidAmount - oldDoc.paidAmount);
    }
  } else {
    paidAmount = sale.paidAmount + doc.paidAmount;
    balanceAmount = sale.balanceAmount - doc.paidAmount;
  }

  if (balanceAmount == 0) {
    closedSaleDetail('saved', doc.saleId);
    selector = {
      $set: {
        status: 'closed',
        statusDate: doc.paymentDate,
        paymentDate: doc.paymentDate,
        paidAmount: paidAmount,
        balanceAmount: balanceAmount
      }
    }
  } else {
    selector = {
      $set: {
        status: 'partial',
        statusDate: sale.saleDate,
        paymentDate: doc.paymentDate,
        paidAmount: paidAmount,
        balanceAmount: balanceAmount
      }
    }
  }
  return Restaurant.Collection.Sales.update({
    _id: doc.saleId
  }, selector);
};


let closedSaleDetail = (status, saleId) => {
  Restaurant.Collection.SaleDetails.direct.update({
    saleId: saleId
  }, {
    $set: {
      status: status
    }
  }, {
    multi: true
  })
}
