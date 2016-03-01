Restaurant.Collection.Payments = new Mongo.Collection("restaurant_payments");
Restaurant.Schema.Payments = new SimpleSchema({
    customerId: {
        type: String,
        label: "Customer",
        autoform:{
          type: 'select',
          options(){
            let sub = Meteor.subscribe("customers", 50);
            if(!sub.ready()){
              IonLoading.show();
            }else{
              IonLoading.hide();
              let list = [];
              Restaurant.Collection.Customers.find().forEach((customer)=>{
                list.push({label: `${customer._id} | ${customer.name}`, value: customer._id});
              });
              return list;
            }
          }
        }
    },
    saleId: {
        type: String,
        label: "SaleId"
       /* autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.saleList()
            }
        }*/
    },
    paymentDate: {
        type: Date,
        label: "Payment Date"
    },
    paidAmount:{
        type:Number,
        label:"Pay Amount",
        decimal:true
    },
    truelyPaid: {
      type: Number,
      optional: true,
      decimal: true
    },
    dueAmount:{
        type:Number,
        label:"Due Amount",
        decimal:true
    },
    balanceAmount:{
        type:Number,
        label:"Balance Amount"
    },
    status:{
        type:String,
        label:"Status",
        optional: true
    },
    description: {
      type: String,
      optional: true
    }
});
Restaurant.Collection.Payments.attachSchema(Restaurant.Schema.Payments);
