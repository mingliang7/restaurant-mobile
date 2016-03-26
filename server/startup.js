/*khName
 khShortName
 enName
 enShortName
 khAddress
 enAddress
 telephone
 email
 website     */
Meteor.startup(function() {
  /*if(Table.find().count() == 0) {
      for(i=0;i<20;i++) {
          Table.insert({text: `text ${i}`, content: `table ${i}`, avatarUrl: 'https://placehold.it/350x150'});
      }
  }*/
  //create user
  if (Meteor.users.find().count() <= 0) {
    let superId = Accounts.createUser({
      username: 'super',
      email: 'super@rabbit.com',
      password: 'super123',
      approved: true
    })
    Roles.addUsersToRoles(superId, ['cashier', 'setting', 'seller', 'super'])
  }
  if (Restaurant.Collection.Currency.find().count() == 0) {
    var doc = [{
      _id: 'KHR',
      name: 'Cambodian Riel',
      symbol: 'R',
      num: '1'
    }, {
      _id: 'USD',
      name: 'United States Dollar',
      symbol: '$',
      num: '2'
    }];
    doc.forEach(function(obj) {
      Restaurant.Collection.Currency.insert(obj);
    });
  }
  if (Restaurant.Collection.Company.find().count() == 0) {

    var company = {
      khName: "រ៉ាប៊ីត",
      khShortName: "រ៉ាប៊ីត",
      enName: "Rabbit Training Center",
      enShortName: "RTC",
      khAddress: "បាត់ដំបង",
      enAddress: "Battambang",
      telephone: "096753432",
      email: "example@gmail.com",
      baseCurrency: "USD"
    };
    Restaurant.Collection.Company.insert(company);
  }
  //ensure index
  Restaurant.Collection.Sales._ensureIndex({
    total: 1
  });
  Restaurant.Collection.Sales._ensureIndex({
    status: 1
  });
  Restaurant.Collection.Products._ensureIndex({
    name: 1
  });
  Restaurant.Collection.Products._ensureIndex({
    tags: 'text'
  });
  Restaurant.Collection.SaleDetails._ensureIndex({
    saleId: 1
  });
  Restaurant.Collection.Sales._ensureIndex({'eop.status': 1});
  Restaurant.Collection.Sales._ensureIndex({'eop._id': 1});
  Restaurant.Collection.StockIn._ensureIndex({materialId: 1});
  Restaurant.Collection.StockIn._ensureIndex({status: 1});
  //end ensure index

  Meteor.defer(function() {
    let emptySales = Restaurant.Collection.Sales.find({
      total: {
        $exists: false
      }
    }, {
      multi: true
    });
    if (emptySales.count != 0) {
      emptySales.forEach((emptySale) => {
        Restaurant.Collection.Sales.direct.remove(emptySale._id);
      });
    }
  })

})
