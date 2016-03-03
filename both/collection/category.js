Restaurant.Collection.Categories = new Mongo.Collection("restaurant_categories");
Restaurant.Schema.Categories = new SimpleSchema({
    name: {
        type: String,
        label: "ឈ្មោះ",
        //unique: true,
        max: 200
    },
    description:{
        type:String,
        label:"ពិពណ៌នា",
        optional:true
    },
    tags: {
      type: [String],
      optional: true
    },
    units: {
      type: [String],
      optional: true
    }
  /*  parentId:{
        type:String,
        label:"ParentId",
        optional:true,
        autoform: {
            type: "select2",
            options: function () {
                //return Restaurant.List.category();
               return Restaurant.List.category("Select Parent | No Parent");
            }
        }
    }*/

});
Restaurant.Collection.Categories.attachSchema(Restaurant.Schema.Categories);
