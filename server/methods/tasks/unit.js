Meteor.methods({
    insertRTBUnit() {
        let tmpUnit = 'ចាន ចានធំ ចានតូច គូ ដប កំប៉ុង កែវ កេះ អត់ដឹង កញ្ចប់ ឆ្នាំងធំ ឆ្នាំងតូច ឆ្នាំង ដបធំ ដបតូច ក្រាម ដំុ គ្រាប់ ក្បាល';
        let units = tmpUnit.split(' ');
        Restaurant.Collection.Units.remove({});
        for (let i = 0; i < units.length; i++) {
          Restaurant.Collection.Units.insert({name: units[i]});
        }
    }
});
