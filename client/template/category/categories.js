Template.tableCategories.created = function(){
    this.autorun(()=>{
        this.subscription = Meteor.subscribe('categories');
    })
};

Template.tableCategories.rendered = function() {
  this.autorun(() => {
      if (!this.subscription.ready()) {
          IonLoading.show();
      } else {
          IonLoading.hide();
      }
  });
};

Template.tableCategories.helpers({
    categories(){
        return Categories.find();
    },
    getCategoryPath(){
        let tableId = Router.current().params.id;
        let categoryId= this._id;
        return `/tables/${tableId}/categories/${categoryId}`;
    }
});

AutoForm.hooks({
    categoryNew: {
        onSuccess(formType, result){
            Bert.alert('Added', 'success', 'growl-bottom-right');
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
        }
    }
});