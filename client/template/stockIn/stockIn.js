Tracker.autorun(function() {
  if (Session.get('stockInSkip')) {
    Meteor.subscribe("stockIn",{stockId: Router.current().params.stockId},{
      limit: 10,
      sort: {
        _id: -1,
        status: 1
      },
      skip: Session.get('stockInSkip')
    });
  }
});

Template.restaurantStockIn.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("stockIn",{stockId: Router.current().params.stockId}, {
      limit: 10,
      sort: {
        _id: -1,
        status: 1
      },
      skip: Session.get('stockInSkip')
    });
    this.subscribe = Meteor.subscribe("countStockIn", Router.current().params.stockId);
  });
};


Template.restaurantStockIn.rendered = function() {
  try {
    Session.set('stockInSkip', 0);
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
};
Template.restaurantStockIn.events({
  "click .remove-stock" (event, template) {
    let name = this._material.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        IonLoading.show();
        Meteor.call('removeStockIn', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`, 'danger', 'growl-bottom-right', 'fa-remove');
            IonLoading.hide();
          } else {
            IonLoading.hide();
            Bert.alert(`លុប ${name} បានជោគជ័យ !`, 'success', 'growl-bottom-right', 'fa-check');
          }
        });
      }
    });
  },
  'click .next' () {
    let skip = Session.get('stockInSkip');
    Session.set('stockInSkip', skip + 10);
  },
  'click .previous' () {
    let skip = Session.get('stockInSkip');
    Session.set('stockInSkip', skip - 10);
  }
});
Template.restaurantStockIn.helpers({
  importDate(){
    return Router.current().params.stockDate;
  },
  stockIns() {
    return Restaurant.Collection.StockIn.find({stockId: Router.current().params.stockId}, {
      sort: {
        _id: -1
      }
    });
  },
  noStockIns() {
    let stockIns = Restaurant.Collection.StockIn.find({stockId: Router.current().params.stockId});
    if (stockIns.count() <= 0) {
      return true;
    }
    return false;
  },
  isActived(status) {
    if (status == 'active') {
      return true;
    }
    return false;
  },
  colorStatus(status) {
    if (status == 'active') {
      return `<span class="positive"><i class="icon ion-ionic"></i>&nbsp;មិនទាន់បានកាត់</span>`;
    }
    return `<span class="balanced"><i class="icon ion-checkmark-round"></i>&nbsp;បានកាត់រួចរាល់</span>`;
  },
  skipAmount() {
    return Session.get('stockInSkip');
  },
  smallerThanAmount() {
    let currentStockInCount = Restaurant.Collection.StockIn.find().count();
    let stockInSkipCount = Session.get('stockInSkip');
    if (stockInSkipCount >= Counts.get('countStockIn') || stockInSkipCount >= (Counts.get('countStockIn') - currentStockInCount)) {
      return false;
    }
    return true;
  },
  isSkipped() {
    let skip = Session.get('stockInSkip');
    if (skip == 0) {
      return false;
    }
    return true;
  },
  isSkipNotEqToZero() {
    if (Counts.get('countStockIn') > 10) {
      return true;
    }
    return false;
  }
});
