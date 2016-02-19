Template.product.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('products');
    }.bind(this));
};
Template.product.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.product.helpers({
    products(){
        var arr=[];
        var products= Restaurant.Collection.Products.find();
        products.forEach(function(product){
          if(product.picture){
             var img = Images.findOne(product.picture);
             product.url=img.url();
          }         
          arr.push(product);
        });
        return arr;        
    }
});

Template.product.events({
  'click [data-action="confirm"]'(event, template) {
       IonPopup.confirm({
           title: 'Are you sure?',
           template: `Detele ${this.name}?`,
           onOk: () => {
               Meteor.call('removeProduct', this._id);
           },
           onCancel: function () {
               console.log('Cancelled');
           }
       });
   }
});
