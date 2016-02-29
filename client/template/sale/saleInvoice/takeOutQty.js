Template.takeOutQty.onRendered(() => {
  let detachObj = Session.get('detachSaleDetailObj');
  if(_.has(detachObj[`${Template.instance().data.id}`], 'qtyChanged')){
    delete detachObj[`${Template.instance().data.id}`].qtyChanged;
    Session.set('detachSaleDetailObj', detachObj);
  }
});

Template.takeOutQty.events({
  'click .plus' (e) {
    let detachObj = Session.get('detachSaleDetailObj');
    debugger
    let data = Template.instance().data;
    let qty = parseInt($('h2.qty').text());
    if (qty >= data.qty) {
      Bert.alert(`ចំនួនមិនអាចលើសពី ${data.qty}`, 'danger', 'growl-bottom-right');
    } else {
      $('h2.qty').text(qty + 1);
      if ((qty + 1) != data.qty) {
        detachObj[`${data.id}`].qtyChanged = qty + 1
        Session.set('detachSaleDetailObj', detachObj);
      } else {
        delete detachObj[`${data.id}`].qtyChanged;
        Session.set('detachSaleDetailObj', detachObj);
      }
    }
  },
  'click .minus' (e) {
    let detachObj = Session.get('detachSaleDetailObj');
    let data = Template.instance().data;
    let qty = parseInt($('h2.qty').text());
    if (qty <= 1) {
      Bert.alert(`ចំនួនមិនអាចតូចជាង 1`, 'danger', 'growl-bottom-right');
    } else {
      $('h2.qty').text(qty - 1);
      detachObj[`${data.id}`].qtyChanged = qty - 1;
      Session.set('detachSaleDetailObj', detachObj)
    }
  }
});
