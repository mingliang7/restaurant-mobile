Template.restaurantStockIn.rendered = function(){
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("stockIn", {status: 'active'});
  });
};
