Tracker.autorun(function() {
  if (Session.get('stockSkip')) {
    Meteor.subscribe("stocks", {
      limit: 10,
      sort: {
        _id: -1
      },
      skip: Session.get('stockSkip')
    });
  }
});

Template.restaurantStocks.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("stocks", {
      limit: 10,
      sort: {
        _id: -1
      },
      skip: Session.get('stockSkip')
    });
    this.subscribe = Meteor.subscribe("countStocks");
  });
};


Template.restaurantStocks.rendered = function() {
  try {
    Session.set('stockSkip', 0);
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
Template.restaurantStocks.events({
  "click .remove-stock" (event, template) {
    let name = moment(this.stockDate).format('YYYY-MM-DD HH:mm:ss');
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុបស្តុកទំនិញថ្ងៃទី ${name} ?`,
      onOk: () => {
        IonLoading.show();
        Meteor.call('removeStock', this._id, function(err, result) {
          if (err) {
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
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
    let skip = Session.get('stockSkip');
    Session.set('stockSkip', skip + 10);
  },
  'click .previous' () {
    let skip = Session.get('stockSkip');
    Session.set('stockSkip', skip - 10);
  }
});
Template.restaurantStocks.helpers({
  stocks() {
    return Restaurant.Collection.Stocks.find({}, {
      sort: {
        _id: -1
      }
    });
  },
  noStocks() {
    let stocks = Restaurant.Collection.Stocks.find();
    if (stocks.count() <= 0) {
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
    return Session.get('stockSkip');
  },
  smallerThanAmount() {
    let currentStocksCount = Restaurant.Collection.Stocks.find().count();
    let stockSkipCount = Session.get('stockSkip');
    if (stockSkipCount >= Counts.get('countStocks') || stockSkipCount >= (Counts.get('countStocks') - currentStocksCount)) {
      return false;
    }
    return true;
  },
  isSkipped() {
    let skip = Session.get('stockSkip');
    if (skip === 0) {
      return false;
    }
    return true;
  },
  isSkipNotEqToZero() {
    if (Counts.get('countStocks') > 10) {
      return true;
    }
    return false;
  }
});
