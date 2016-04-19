Meteor.methods({
    insertRTBCategory() {
        let categories = ["អាហារពេលព្រឹក", "ម្ហូបអាំងចៀន", "សម្លរ", "ញាំុ","ឆា","ផ្សេងៗ","ភេសជ្ជៈ"];
        Restaurant.Collection.Categories.remove({});
        for(let i = 0 ; i < categories.length; i++){
          Restaurant.Collection.Categories.insert({name: categories[i]});
        }
    },
    insertMaterialCategory(){
      let categories = ["គ្រឿងសមុទ្រ", "ប្រហិត", "គ្រឿងក្លែម", "សាច់","គ្រឿងក្នុង","ត្រី","ភេសជ្ជៈ"];
      Restaurant.Collection.MaterialCategories.remove({});
      for(let i = 0 ; i < categories.length; i++){
        Restaurant.Collection.MaterialCategories.insert({name: categories[i]});
      }
    }
});
