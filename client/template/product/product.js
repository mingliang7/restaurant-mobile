Template.product.created = function() {
  this.autorun(function() {
    this.subscription = Meteor.subscribe('products');
  }.bind(this));
};
Template.product.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.product.helpers({
  products() {
    var arr = [];
    var products = Restaurant.Collection.Products.find();
    products.forEach(function(product) {
      if (product.picture) {
        var img = Images.findOne(product.picture);
        product.url = img.url();
      }
      arr.push(product);
    });
    return arr;
  }
});

Template.product.events({
  'click [data-action="confirm"]' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'Are you sure?',
      template: `Detele ${name}?`,
      onOk: () => {
        Meteor.call('removeProduct', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`Removed ${name}`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled','info','growl-bottom-right','fa-info')
      }
    });
  }
});
