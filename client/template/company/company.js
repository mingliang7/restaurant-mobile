Template.company.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('company');
    }.bind(this));
};
Template.company.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.company.helpers({
    company(){
        return Restaurant.Collection.Company.findOne()
    }
});
