var indexTmpl = Template.restaurantChefMonitor;
var notificationSound = new buzz.sound('/sounds/notification.ogg');
indexTmpl.created = function () {
    var startOfDay = moment().startOf('days').toDate();
    var endOfDay = moment().endOf('days').toDate();
    var defaultSelector = {
        updatedAt: {$gte: startOfDay, $lte: endOfDay},
        monitor: true,
        isFinishing: false
    }
    this.selector = new ReactiveVar(defaultSelector);
    this.query = new ReactiveVar();
    this.count = new ReactiveVar(0);
    this.autorun(()=> {
        this.subscription = Meteor.subscribe('chefMonitorPub', this.selector.get());
        this.chefMonitorPubTodayCountSub = Meteor.subscribe("chefMonitorPubToday", defaultSelector);

    });
};

indexTmpl.rendered = function () {
    this.autorun(()=> {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {

            IonLoading.hide();
        }
        if (this.chefMonitorPubTodayCountSub.ready()) {
            let saleDetailCount = Counts.get('chefMonitorPubTodayCount');
            if (this.count.get() < saleDetailCount) {
                this.count.set(saleDetailCount);
                notificationSound.play();
            }
        }
    });
};

indexTmpl.helpers({
    saleDetails(){
        var instance = Template.instance();
        var q = instance.query.get();
        if (q) {
            var selector = instance.selector.get();
            let regPattern = `${q}`;
            let reg = new RegExp(regPattern, 'i');//match all case
            selector.$or = [{'_product.name': {$regex: reg}}, {'cookForTable': {$regex: reg}}];
            return Restaurant.Collection.SaleDetails.find(selector, {sort: {updatedAt: 1}});
        }
        return Restaurant.Collection.SaleDetails.find(instance.selector.get(), {sort: {updatedAt: 1}});
    },
    cookLeft(cookQty, finishQty, isFinishing){
        if(isFinishing) {
            return finishQty;
        }else{
            return  cookQty - finishQty;
        }
    },
    notZeroQty(){
        if(this.isFinishing) {
            return this.finishQty;
        }
        return this.cookQty - this.finishQty != 0
    }
});
indexTmpl.events({
    'change .toggleCook'(event, instance){
        var value = $(event.currentTarget).prop('checked');
        var startOfDay = moment().startOf('days').toDate();
        var endOfDay = moment().endOf('days').toDate();
        if (value) {
            $('.monitor-info').text('បានចំអិនហើយ');
            instance.selector.set({
                updatedAt: {$gte: startOfDay, $lte: endOfDay},
                monitor: true,
                isFinishing: true
            })
        } else {
            $('.monitor-info').text('មិនទាន់បានចំអិន');
            instance.selector.set({
                updatedAt: {$gte: startOfDay, $lte: endOfDay},
                monitor: true,
                isFinishing: false
            })
        }
    },
    'click .finish-cook'(event, instance){
        Meteor.call('updateCook', {flag: true, doc: this}, function (err, result) {
            if (result) {
                Bert.alert(`ជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            }
        })
    },
    'click .unfinish-cook'(event, instance){
        Meteor.call('updateCook', {flag: false, doc: this}, function (err, result) {
            if (result) {
                Bert.alert(`ជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            }
        })
    },
    'click .cook'(event, instance){
        Meteor.call('cookingFlag', {flag: true, doc: this}, function (err, result) {
            if (result) {
                Bert.alert(`ជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            }
        })
    },
    'click .cooking'(event, instance){
        Meteor.call('cookingFlag', {flag: false, doc: this}, function (err, result) {
            if (result) {
                Bert.alert(`ជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            }
        })
    },
    'click .cancel-cook'(event, instance){
        var data = this;
        IonPopup.confirm({
            title: 'ដកមុខទំនិញពីចុងភៅ?',
            template: `មុខទំនិញ: <b>${this._product.name}?</b>`,
            onOk: () => {
                Meteor.call('removeSaleDetailFromChef', data, (err, result) => {
                    if (err) {
                        Bert.alert(`លុបមិនបានជោគជ័យ! ${data._product.name}`, 'danger', 'growl-bottom-right', 'fa-remove')
                    } else {
                        Bert.alert(`ដកចេញបានជោគជ័យ! ${data._product.name}`, 'success', 'growl-bottom-right', 'fa-check')
                    }
                });
            },
            onCancel: function () {

            }
        });
    },
    'keyup .search-table'(event, instance){
        if (event.currentTarget.value != '') {
            instance.query.set(event.currentTarget.value);
        } else {
            instance.query.set(undefined);
        }
    }

});
