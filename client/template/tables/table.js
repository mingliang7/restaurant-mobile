Template.tables.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('tables');
    }.bind(this));
};
Template.tables.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.tables.helpers({
    tables(){
        return Restaurant.Collection.Tables.find()
    },
    avatarUrl(){
        return 'https://placehold.it/350x150'
    },
    getTableShow: function() {
        return `/tables/${this._id}/categories`
    }
});
