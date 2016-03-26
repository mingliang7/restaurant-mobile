Tracker.autorun(function(){
  if(Session.get('stockIn')){
    Meteor.subscribe("stockIn", {status: Session.get('stockIn')});
  }
});

Template.restaurantStockIn.created = function(){
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("stockIn", {status: 'active'});
  });
};


Template.restaurantStockIn.rendered = function(){
  try {
    Session.set('stockIn', 'active');
    this.autorun(()=>{
      if(!this.subscription.ready()){
        IonLoading.show();
      }else{
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
};

Template.restaurantStockIn.helpers({
  stockIns(){
    return Restaurant.Collection.StockIn.find({status: Session.get('stockIn')});
  },
  noStockIns(){
    let stockIns = Restaurant.Collection.StockIn.find();
    if(stockIns.count() <= 0){
      return true;
    }
    return false;
  }
});
