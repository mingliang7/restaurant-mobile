Template.restaurantInvoice.helpers({
    data() {
        let paymentId = Router.current().params.paymentId;
        Fetcher.setDefault(paymentId, false);
        Fetcher.retrieve(paymentId, 'findPaymentInvoice', paymentId);
        return Fetcher.get(paymentId);
    },
    goBack(){
        Meteor.setTimeout(()=> {
            window.print();
            Router.go('/restaurant/sale');
        }, 1000)
    }
});
