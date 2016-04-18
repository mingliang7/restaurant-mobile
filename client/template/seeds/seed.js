Template.restaurantSeeds.events({
  'click .go-seed'(){
    let migrate = $('.migrate-data').val();
    IonPopup.confirm({
      title: 'Are you sure?',
      template: `ចាប់ផ្តើមបញ្ចូលទិន្នន័យ`,
      onOk: () => {
        IonLoading.show();
        if(migrate == 'rtb'){
          Meteor.call('fetchProduct', 'insertRTBUnit', 'insertRTBCategory', 'rtbFoods.json', (err,result)=>{
            if(result){
              IonLoading.hide();
              alertify.success('បញ្ចូលទិន្នន័យបានជោគជ័យ');
            }else{
              IonLoading.hide();
            }
          });
        }
      }
    });
  },
  'click .go-seed-material'(){
    let material = $('.migrate-material').val();
    IonPopup.confirm({
      title: 'Are you sure?',
      template: `ចាប់ផ្តើមបញ្ចូលទិន្នន័យ`,
      onOk: () => {
        IonLoading.show();
        if(material !== ''){
          Meteor.call('fetchMaterial', 'material.json', (err,result)=>{
            if(result){
              IonLoading.hide();
              alertify.success('បញ្ចូលទិន្នន័យបានជោគជ័យ');
            }else{
              IonLoading.hide();
            }
          });
        }
      }
    });
  }
});
