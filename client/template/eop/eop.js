Tracker.autorun(function(){
  if(Session.get('skipEop')){
    this.subscribe = Meteor.subscribe("endOfProcess", {sort: {_id: -1}, skip: Session.get('skipEop'), limit: 10});
  }
});

Template.restaurantEop.created = function(){
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("endOfProcess", {sort: {_id: -1}, skip: 0, limit: 10});
  });
};

Template.restaurantEop.rendered = function(){
  try {
    Session.set('skipEop',0);
    this.autorun(()=>{
      if(!this.subscription.ready())
      {
        IonLoading.show();
      }else{
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
};

Template.restaurantEop.helpers({
  eops(){
    return Restaurant.Collection.EndOfProcess.find();
  },
  noEops(){
    let eops = Restaurant.Collection.EndOfProcess.find();
    if(eops.count()<= 0){
      return true;
    }
    if(Session.get('skipEop') > 0){
      return false;
    }
    return false;
  },
  findLastRecord(id){
    let eops = Restaurant.Collection.EndOfProcess.find({}, {sort: {_id: 1}}).fetch();
    let lastRecord = eops.last();
    if(id == lastRecord._id){
      return true;
    }
    return false;
  }
});
Template.restaurantEop.events({
  "click .remove-eop"(event, template){
    let name = this._id;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        IonLoading.show();
        Meteor.call('removeEop', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove');
            IonLoading.hide();
          } else {
            IonLoading.hide();
            Bert.alert(`លុប ${name} បានជោគជ័យ !`,'success','growl-bottom-right','fa-check');
          }
        });
      }
    });
  }
});
