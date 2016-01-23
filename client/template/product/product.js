Session.set('productObj', {});
Template.tableCategoriesProduct.created = function () {
    this.autorun(()=> {
        debugger
        this.subscription = Meteor.subscribe('product', Router.current().params.categoryId);
    });
};
Template.tableCategories.rendered = function () {
    this.autorun(()=> {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide()
        }
    })
};
Template.tableCategoriesProduct.helpers({
    products(){
        return Product.find();
    },
    checkInvisible(){
        let  product = Session.get('productObj');
        let  id = this._id;
        if(!_.has(product, id)) {
            return 'invisible';
        }
    }
});

Template.tableCategoriesProduct.events({
    'click .check-click'(e){
        var obj = Session.get('productObj')
        $(e.currentTarget).find('.icon').toggleClass('invisible');
        let checkInvisible =  $(e.currentTarget).find('.icon').hasClass('invisible');
        let id = $(e.currentTarget).parents('.product-doc').find('.product-id').data('id');
        let price = $(e.currentTarget).parents('.product-doc').find('.product-price').data('id')
        if(!checkInvisible){
            obj[id] ={
                _id: id,
                price: price
            }
        }else{
            delete obj[id]
        }
        Session.set('productObj', obj)
        console.log(Session.get('productObj'));
    }
});