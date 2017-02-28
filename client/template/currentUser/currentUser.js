Template.current_user.onCreated(function() {
    this.printedSales = new ReactiveVar([]);
    this.query = new ReactiveVar();
    this.tableId = new ReactiveVar('all');
    this.autorun(()=>{
        let saleDate = moment().startOf('days').toDate();
        let q = this.query.get();
        let tableId = this.tableId.get();
        if(tableId || q){
            Meteor.call('printedSales', {q, saleDate, tableId}, (err,result)=>{
                if(!err){
                    this.printedSales.set(result);
                }
            });
        }
    });
});
Template.current_user.onRendered(function(){
    $('[name="searchPrintedInvoice"]').focus();
})
Template.current_user.helpers({
    checkIf(currentUser) {
        if (currentUser.profile.interestPick) Router.go(`/`);
    },
    printedSales(){
        let instance = Template.instance();
        return instance.printedSales.get();
    },
    tables(){
        let tables = Restaurant.Collection.Tables.find({});
        return tables;
    }
});
Template.current_user.events({
    "change [name='table']"(event,instance){
        instance.tableId.set(event.currentTarget.value);
    },
    "keyup [name='searchPrintedInvoice']": _.debounce(function(event,instance){
        instance.query.set(event.currentTarget.value)
    },300),
    "click .printedSale"(event,instance){
        Router.go(`/restaurant/sale/${this.doc.tableLocation}/table/${this.doc.tableId}/saleInvoice/${this._id}/payment`);
    }
});
