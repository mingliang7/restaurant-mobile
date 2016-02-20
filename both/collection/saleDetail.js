Restaurant.Collection.SaleDetails = new Mongo.Collection("restaurant_saleDetails");

Restaurant.Schema.SaleDetails = new SimpleSchema({
  saleId: {
    type: String,
    label: "Sale"
  },
  productId: {
    type: String,
    label: "Product"
  },
  price: {
    type: Number,
    label: "Price",
    decimal: true
  },
  discount: {
    type: Number,
    label: "Discount",
    decimal: true,
    autoValue(){
      if(this.isInsert){
        return 0;
      }
    }
  },
  quantity: {
    type: Number,
    label: "Quantity",
    autoValue(){
      if(this.isInsert){
        return 1;
      }
    }
  },
  amount: {
    type: Number,
    label: "Amount",
    decimal: true,
    autoform: {
      afFieldInput: {
        value(){
          let price= AutoForm.getFieldInput('price');
          let quantity = AutoForm.getFieldInput('price');
          return price * quantity;
        }
      }
    }
  },
  status: {
    type: String,
    label: "Status",
    autoValue(){
      if(this.isInsert){
        return 'unsaved'
      }
    }
  },
  note: {
    type: [String],
    label: "Note",
    optional: true
  },
  qtyPrinted: {
    type: Number,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return 0;
      }
    }
  },
  monitor: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      }
    }
  },
  isCooking: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      }
    }
  },
  isFinishing:{
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      }
    }
  },
  cookQty: {
      type: Number,
      autoValue: function(){
        if(this.isInsert){
          return 0;
        }
      }
  },
  notify: {
    type: Boolean,
    autoValue: function(){
      if(this.isInsert || this.isUpdate){
        return true;
      }
    }
  }
});
Restaurant.Collection.SaleDetails.attachSchema(Restaurant.Schema.SaleDetails);
