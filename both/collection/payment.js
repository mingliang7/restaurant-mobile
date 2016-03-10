Restaurant.Collection.Payments = new Mongo.Collection("restaurant_payments");
Restaurant.Schema.Payments = new SimpleSchema({
    customerId: {
        type: String,
        label: 'អតិថិជន',
        autoform: {
            type: 'select',
            options(){
                let sub = Meteor.subscribe("customers", 50);
                if (!sub.ready()) {
                    IonLoading.show();
                } else {
                    IonLoading.hide();
                    let list = [];
                    Restaurant.Collection.Customers.find().forEach((customer)=> {
                        list.push({label: `${customer._id} | ${customer.name}`, value: customer._id});
                    });
                    return list;
                }
            }
        }
    },
    saleId: {
        type: String,
        label: "លេខវិក័យប័ត្រ"
        /* autoform: {
         type: "select2",
         options: function () {
         return Restaurant.List.saleList()
         }
         }*/
    },
    paymentDate: {
        type: Date,
        label: "កាលបរិច្ឆេទបង់ប្រាក់"
    },
    paidAmount: {
        type: Number,
        label: "ប្រាក់បានបង់",
        decimal: true
    },
    truelyPaid: {
        type: Number,
        optional: true,
        decimal: true
    },
    dueAmount: {
        type: Number,
        label: "ប្រាក់ត្រូវបង់",
        decimal: true
    },
    balanceAmount: {
        type: Number,
        label: "Balance Amount"
    },
    status: {
        type: String,
        label: "ស្ថានភាព",
        optional: true
    },
    description: {
        type: String,
        label: "ពិពណ៌នា",
        optional: true
    },
    discount: {
      type: Number,
      decimal: true,
      optional: true
    },
    staffId: {
      type: String,
      optional: true,
      autoValue(){
        if(this.isInsert || this.isUpdate){
          return Meteor.userId();
        }
      }
    }
});
Restaurant.Collection.Payments.attachSchema(Restaurant.Schema.Payments);
