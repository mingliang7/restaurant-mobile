Template.restaurantVipcard.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("vipcards");
  })
}


Template.restaurantVipcard.rendered = function() {
  this.autorun(() => {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  })
}

Template.restaurantVipcard.helpers({
  vipcards() {
    return Restaurant.Collection.Vipcards.find({}, {
      sort: {
        _id: -1
      }
    })
  },
  vipcardsNotZero(){
    let count = Restaurant.Collection.Vipcards.find({}).count();
    if(count > 0) {
      return true;
    }
    return false;
  }
});

Template.restaurantVipcard.events({
  'click .remove-vipcard' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        Meteor.call('removeVipcard', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`លុប ${name} បានជោគជ័យ​ !`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info')
      }
    });
  },
  'click .vipcard-name'(e){
    Router.go(`/restaurant/vipcards/${this._id}/edit`)
  }
});
