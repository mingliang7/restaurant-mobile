Deps.autorun(function () {
  if (Session.get('searchQuery')) {
    Meteor.subscribe('productsSearch', Session.get('searchQuery'), Session.get('limit'));
    if (Session.get('subProductImages')) {
      Meteor.subscribe('subProductImages', {_id: {$in: Session.get('subProductImages')}})
    }
  }
});

Template.productSearch.rendered = function () {
  Session.set('limit', 10);
};
Template.productSearch.events({
  'keyup input': function (event, template) {
    Session.set('searchQuery', event.target.value);
  },
  'click .loadMore' () {
    let amount = Session.get('limit');
    Session.set('limit', amount + 5);
  },
  'click a': function (event, template) {
    IonModal.close();
  },
  'click [data-action="confirm"]' (event, template) {
    let name = this.name;
    IonPopup.confirm({
          title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
          template: `លុប ${name} ?`,
          onOk: () => {
          Meteor.call('removeProduct', this._id, function (err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`, 'danger', 'growl-bottom-right', 'fa-remove')
          } else {
            Bert.alert(`លុប ${name}​ បានជោគជ័យ !`, 'success', 'growl-bottom-right', 'fa-check')
          }
        });
  },
    onCancel: function () {
      Bert.alert('មិនយល់ព្រមក្នុងការលុប !', 'info', 'growl-bottom-right', 'fa-info')
    }
  });
  }
});

Template.productSearch.helpers({
  products: function () {
    let products = Restaurant.Collection.Products.search(Session.get('searchQuery'), Session.get('limit'), ['sale', 'material']);
    let arr = [];
    products.forEach(function (product) {
        if (product.picture) {
         arr.push(product.picture);
        }

    });
    Session.set('subProductImages', arr)
    return products;
  },
  searchQuery: function () {
    return Session.get('searchQuery');
  }
});


Template._productItem.helpers({
    findMaterial(id) {
      return ReactiveMethod.call("getMaterialName", id);
    },
    findUnit(id) {
        return ReactiveMethod.call("getUnitName", id);
    },
    images() {
     let img = Images.findOne(this.picture)
     return img ? img.url() : ''
   }
});
