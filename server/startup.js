Meteor.startup(function(){
   /*if(Table.find().count() == 0) {
       for(i=0;i<20;i++) {
           Table.insert({text: `text ${i}`, content: `table ${i}`, avatarUrl: 'https://placehold.it/350x150'});
       }
   }*/
    if (Restaurant.Collection.Currency.find().count() == 0) {
        var doc = [
            {_id: 'KHR', name: 'Cambodian Riel', symbol: 'R', num: '1'},
            {_id: 'USD', name: 'United States Dollar', symbol: '$', num: '2'}
        ];
        doc.forEach(function(obj){
        	Restaurant.Collection.Currency.insert(obj);
        });
    }
    if(Restaurant.Collection.Company.find().count()==0){

        var company={
            khName:"រ៉ាប៊ីត",
            khShortName:"រ៉ាប៊ីត",
            enName:"Rabbit Training Center",
            enShortName:"RTC",
            khAddress:"បាត់ដំបង",
            enAddress:"Battambang",
            telephone:"096753432",
            email:"example@gmail.com",
            baseCurrency:"USD"
        };
        Restaurant.Collection.Company.insert(company);
    }
});


/*khName
 khShortName
 enName
 enShortName
 khAddress
 enAddress
 telephone
 email
 website     */