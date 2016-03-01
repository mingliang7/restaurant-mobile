Template.exchangeRateNew.helpers({
    baseCurrency: function () {
        var company = Restaurant.Collection.Company.findOne();
        if (company) {
            return Restaurant.Collection.Currency.findOne(company.baseCurrency);
        } else {
            return {};
        }
    },
    currencies: function () {
        var company = Restaurant.Collection.Company.findOne();
        if (company) {
            return Restaurant.Collection.Currency.find({_id: {$ne: company.baseCurrency}});
        } else {
            return [];
        }
    }
});
Template.exchangeRateNew.events({
    'change .to-currency-value': function (e) {
        if ($(e.currentTarget).val() == "") {
            $(e.currentTarget).val(0);
            $(e.currentTarget).focus();
            return false;
        }
    },
    'keypress .to-currency-value': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click #save-exchange-rate': function () {
        var valid = true;
        $('.to-currency-value').each(function () {
            valid = $(this).val() != "";
            if (valid == false) {
                return false;
            }
        });

        //if ($('.to-currency-value').val() == "" ||) {
        if (!valid) {
            Bert.alert('The value can\'t be empty', 'danger', 'growl-top-right');
            //alertify.error("The value can't be empty.");
            return;
        }
        debugger;
        var exchangeRate = {};
        exchangeRate.base = $('#base-currency-id').val();
        exchangeRate.symbol = $('#base-currency-symbol').val();
        exchangeRate.rates = [];
        $('#to-currency-list .row').each(function () {
            exchangeRate.rates.push({
                toCurrencyId: $(this).find('.to-currency-id').val(),
                rate: parseFloat($(this).find('.to-currency-value').val()),
                symbol:$(this).find('.to-currency-symbol').val()
            });
        });
        Meteor.call('insertExchangeRate', exchangeRate, function (er, re) {
            if (er) {
                Bert.alert(er.message, 'danger', 'growl-top-right');
            } else {
                Bert.alert('ExchangeRate is set successful', 'success', 'growl-top-right');
                IonModal.close();
            }
        });

        //alertify.success('ExchangeRate is set successful.');
        //alertify.exchangeRate().close();
    }
});
AutoForm.hooks({
    exchangeRateNew: {
        onSuccess(formType, res){
            Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-bottom-right');
            //IonModal.close();
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
        }
    }
});
