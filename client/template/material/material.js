Template.restaurantMaterials.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('materials');
  });
}
Template.restaurantMaterials.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    })
  } catch (e) {

  }
}
Template.restaurantMaterials.helpers({
  materials() {
    return Restaurant.Collection.Materials.find();
  }
})

// Template.restaurantMaterials.events({
//   'click .remove-material' (event, template) {
//     let name = this.name;
//     IonPopup.confirm({
//       title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
//       template: `លុប ${name} ?`,
//       onOk: () => {
//         Meteor.call('ifUnitIdNoUse', this._id, (err, result){
//           if(result.yes){
//             remove(name, this._id);
//           }else{
//             alertify.info(`${name} កំពុងប្រើប្រា់មិនអាចលុបបានទេ!`)
//           }
//         });
//       },
//       onCancel: function() {
//         Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info')
//       }
//     });
//   }
// })

// let removeMaterial = (name,id){
//   Meteor.call('removeCustomer', id, function(err, result) {
//           if (err) {
//             Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
//           } else {
//             Bert.alert(`លុប ${name} បានជោគជ័យ !`,'success','growl-bottom-right','fa-check')
//           }
//         });
// }