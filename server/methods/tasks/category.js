Meteor.methods({
    insertRTBCategory() {
        let categories = ["អាហារពេលព្រឹក", "ម្ហូបអាំងចៀន", "សម្លរ", "ញាំុ","ឆា","ផ្សេងៗ","ភេសជ្ជៈ"];
        Restaurant.Collection.Categories.remove({});
        for(let i = 0 ; i < categories.length; i++){
          Restaurant.Collection.Categories.insert({name: categories[i]});
        }
    }
});
