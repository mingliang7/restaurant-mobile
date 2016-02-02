var indexTpl = Template.bookTags;

indexTpl.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('tags');
    }.bind(this));
};
indexTpl.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

indexTpl.helpers({
    tags(){

        return Reading.Collection.Tags.find();
    },
});
indexTpl.events({
    'click [data-action="confirm"]': function(event, template) {
        debugger
        IonPopup.confirm({
            title: 'Are you sure?',
            template: `Detele ${this.name}?`,
            onOk: () => {
                Meteor.call('removeTag', this._id);
            },
            onCancel: function() {
                console.log('Cancelled');
            }
        });
    }
});

AutoForm.hooks({
    newTag:{
        onSuccess(formType, result){
            Bert.alert('Added', 'success', 'fixed-top');
        },
        onError(formType,err){
            Bert.alert(err.message, 'danger', 'fixed-top');
        }
    }
});