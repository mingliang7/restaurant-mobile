Template._sale_tabs.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("categories");
  });
}
Template._sale_tabs.rendered = function() {


}
Template._sale_tabs.helpers({
  saleDetailExist(){
    let saleDetails = Session.get('saleDetailObj');
    if(!_.isEmpty(saleDetails)){
      return true;
    }
    return false;
  }
})

Template._sale_tabs.events({
  'click .categories' () {
    // Session.set('categoryTags', {tags: {}})
    var arr = [];
    var index = 0;
    var categories = Restaurant.Collection.Categories.find({},{sort: {name: 1}});
    categories.forEach((category) => {
      category.text = category.name
      category.index = index;
      arr.push(category);
      index++;
    })
    IonActionSheet.show({
      titleText: `ជ្រើសរើសផ្នែក`,
      buttons: arr,
      // destructiveText: 'ផ្ទេរវិក័យប័ត្រ',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        let category = arr[index]
        let params = Router.current().params;
        Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}/category/${category._id}`);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  },
  'click .order' () {
    var selector = Session.get('saleDetailObj');
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `យល់ព្រមកម្ម៉ង់?`,
      onOk: () => {
        Meteor.call('insertSaleDetail', selector, function(err, result) {
          if (err) {
            Bert.alert(`កម្ម៉ង់ត្រូវបានច្រានចោល!`, 'danger', 'growl-bottom-right', 'fa-remove')
            Session.set('saleDetailObj', {});
          } else {
            Bert.alert(`កម្ម៉ង់បានសម្រេច!`, 'success', 'growl-bottom-right', 'fa-check')
            Session.set('saleDetailObj', {});
            let params = Router.current().params;
            Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`)
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  }
});
