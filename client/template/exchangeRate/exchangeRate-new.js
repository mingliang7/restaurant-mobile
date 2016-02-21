Template.exchangeRateNew.helpers({
    baseCurrency: function () {
        var company = Restaurant.Collection.Company.findOne();
        if(company){
            return Restaurant.Collection.Currency.findOne(company.baseCurrency);
        }else{
            return {};
        }
    },
    currencies: function () {
        var company = Restaurant.Collection.Company.findOne();
        if(company){
            return Restaurant.Collection.Currency.find({_id: {$ne: company.baseCurrency}});
        }else{
            return [];
        }
    }
});
AutoForm.hooks({
   exchangeRateNew:{
       onSuccess(formType, res){
           Bert.alert('Added', 'success', 'growl-bottom-right');
           //IonModal.close();
       },
       onError(formType, err){
           Bert.alert( err.message, 'danger', 'growl-bottom-right' );
       }
   }
});
