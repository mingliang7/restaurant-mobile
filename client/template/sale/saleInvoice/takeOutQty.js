Template.takeOutQty.events({
  'click .plus'(e){
    let data = Template.instance().data;
    let qty = parseInt($('h2.qty').text());
    console.log(qty);
    if(qty >= data.qty){
      Bert.alert(`ចំនួនមិនអាចលើសពី ${data.qty}`, 'danger', 'growl-bottom-right');
    }else{
      $('h2.qty').text(qty + 1);
    }
  },
  'click .minus'(e){
    let data = Template.instance().data;
    let qty = parseInt($('h2.qty').text());
    console.log(qty);
    if(qty <= 1){
      Bert.alert(`ចំនួនមិនអាចតូចជាង 1`, 'danger', 'growl-bottom-right');
    }else{
        $('h2.qty').text(qty - 1);
    }
  }
});
