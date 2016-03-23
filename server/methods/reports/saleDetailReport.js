Meteor.methods({
  getSaleDetailReport: function(arg) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };

    var params = {};
    if (arg.status != '') {
      params.status = {
        $in: arg.status.trim().split(',')
      };
    }
    var fromDate = moment(arg.fromDate, "YYYY/MM/DD HH:mm").toDate();
    var toDate = moment(arg.toDate, "YYYY/MM/DD HH:mm").toDate();
    var customerId = arg.customerId;

    var categoryId = arg.categoryId;

    /****** Title *****/
    data.title = Restaurant.Collection.Company.findOne();

    if (fromDate != null && toDate != null) params.saleDate = {
      $gte: fromDate,
      $lte: toDate
    };
    if (customerId != null && customerId != "") params.customerId = customerId;


    var header = {};

    header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    var customer = "ទាំងអស់",
      category = "ទាំងអស់";
    if (customerId != null && customerId != "")
      customer = Restaurant.Collection.Customers.findOne(customerId).name;

    if (categoryId != null && categoryId != "")
      category = Restaurant.Collection.Categories.findOne(categoryId).name;
    header.customer = customer;
    header.category = category;

    /****** Header *****/
    data.header = header;
    console.log(params);
    var saleDetailObj = {};
    var total = 0;
    var sales = Restaurant.Collection.Sales.find(params);
    sales.forEach((sale) => {
      groupSaleDetail(sale, saleDetailObj);
      total += sale.total;
    });
    console.log(saleDetailObj);
    for(let k in saleDetailObj){
      for(let j in saleDetailObj[k].status){
        for(let d in saleDetailObj[k].status[j]){
          saleDetailObj[k].totalAmount += saleDetailObj[k].status[j][d].amount;
          saleDetailObj[k].totalQty += saleDetailObj[k].status[j][d].qty;
        }
        console.log(saleDetailObj[k].status[j]);
      }
    }
    console.log(`total: ${total}`);
    // var content = getSaleProducts(params, categoryId);
    // data.grandTotal = content.grandTotal;
    // data.grandTotalCost = content.grandTotalCost;
    //return reportHelper;
    /****** Content *****/
    // if (content.length > 0) {
    //     data.content = content;
    // }
    // return data;
  }
});

let groupSaleDetail = (sale, saleDetailObj) => {
  let saleDetails = Restaurant.Collection.SaleDetails.find({
    saleId: sale._id
  });
  saleDetails.forEach((saleDetail) => {
    if (_.isUndefined(saleDetailObj[saleDetail.productId])) {
      saleDetailObj[saleDetail.productId] = {};
      saleDetailObj[saleDetail.productId].totalAmount = 0;
      saleDetailObj[saleDetail.productId].totalQty = 0;
      saleDetailObj[saleDetail.productId].actualPrice = saleDetail.price;
      saleDetailObj[saleDetail.productId].status = {};
      saleDetailObj[saleDetail.productId].status[sale.status] = {};
      saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount] = {
        productName: saleDetail._product.name,
        qty: saleDetail.quantity,
        price: saleDetail.price,
        discount: saleDetail.discount,
        amount: (saleDetail.quantity * saleDetail.price) * (1 - (saleDetail.discount / 100))
      };
    } else {
      if (_.isUndefined(saleDetailObj[saleDetail.productId].status[sale.status])) {
        saleDetailObj[saleDetail.productId].status[sale.status] = {};
        saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount] = {
          qty: saleDetail.quantity,
          price: saleDetail.price,
          discount: saleDetail.discount,
          amount: (saleDetail.quantity * saleDetail.price) * (1 - (saleDetail.discount / 100))
        };
      } else {
        if (_.isUndefined(saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount])) {
          saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount] = {
            qty: saleDetail.quantity,
            price: saleDetail.price,
            discount: saleDetail.discount,
            amount: (saleDetail.quantity * saleDetail.price) * (1 - (saleDetail.discount / 100))
          };
        } else {
          saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount].qty += saleDetail.quantity;
          saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount].amount =
            (saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount].qty * saleDetail.price) *
            (1 - (saleDetail.discount / 100));
        }
      }
    }
    return saleDetailObj;
  });
};
