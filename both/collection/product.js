Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {})],
  filter: {
    maxSize: 1048576, // in bytes
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'jpg']
    },
    onInvalid: function(message) {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
  }
});
Restaurant.Collection.Products = new Mongo.Collection("restaurant_products");
Restaurant.Schema.Products = new SimpleSchema({
  picture: {
    type: String,
    label: 'រូបភាពផលិតផល',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    },
    optional: true
  },
  name: {
    type: String,
    label: "ឈ្មោះ",
    max: 200
  },
  enName: {
    type: String,
    label: "ឈ្មោះអង់គ្លេស",
    optional: true
  },
  ingradient: {
    type: [Object],
    label: 'គ្រឿងផ្សំ',
    optional: true,
    custom() {
      if (this.field('stockType').value == 'NonStock' && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
        return "required";
      }
    }
  },
  'ingradient.$.productId': {
    type: String
  },
  'ingradient.$.qty': {
    type: Number,
    decimal: true
  },
  price: {
    type: Number,
    label: "តម្លៃ",
    decimal: true
  },
  categoryId: {
    type: String,
    label: "ផ្នែក",
    autoform: {
      type: "select",
      options: function() {
        return Restaurant.List.category();
      }
    }
  },
  unitId: {
    type: String,
    label: "ខ្នាត",
    autoform: {
      type: "select",
      options: function() {
        return Restaurant.List.unit();
      }
    }
  },
  status: {
    type: String,
    label: "Status",
    optional: true,
    autoform: {
      type: "select",
      options: function() {
        return Restaurant.List.status();
      }
    }
  },
  description: {
    type: String,
    label: "ពិពណ៌នា",
    optional: true
  },
  _category: {
    type: Object,
    blackbox: true,
    optional: true
  },
  _unit: {
    type: Object,
    blackbox: true,
    optional: true
  },
  tags: {
    type: [String],
    optional: true
  }

});
Restaurant.Collection.Products.attachSchema(Restaurant.Schema.Products);

Images.allow({
  insert: function(userId, doc) {
    return true;
  },
  download: function(userId) {
    return true;
  }
});

//search product


Restaurant.Collection.Products.search = function(query, limit) {
  let limitAmount = limit || 10;
  if (!query) {
    return;
  }
  let regPattern = `${query}`;
  let reg = new RegExp(regPattern, 'i') ;//match all case
  let selector = {};
  selector.$or =[{
        enName: {
          $regex: reg
        }
      }, {
        name: {
          $regex: reg
        }
      }, {
        barcode: {
          $regex: reg
        }

      }];

  return Restaurant.Collection.Products.find(selector, {
    sort: {
      name: 1
    },
    limit: limitAmount
  });
};
