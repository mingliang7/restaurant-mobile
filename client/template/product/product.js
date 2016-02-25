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
  },
  join(tags){
    return tags.join(' ');
  }
});

Template.product.events({
  'click [data-action="confirm"]' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        Meteor.call('removeProduct', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`លុប ${name}​ បានជោគជ័យ !`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info')
      }
    });
  }
});
