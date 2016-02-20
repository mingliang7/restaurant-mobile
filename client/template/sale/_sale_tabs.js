Template._sale_tabs.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("categories");
  });
}
Template._sale_tabs.rendered = function() {


}
Template._sale_tabs.helpers({

})

Template._sale_tabs.events({
  'click .categories' () {
    var arr = [];
    var index = 0;
    var categories = Restaurant.Collection.Categories.find();
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
  }
});
