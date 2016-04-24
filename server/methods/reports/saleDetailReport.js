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
    let tmpCategoryName = [];
    if (arg.categoryId != '') {
      let arr = arg.categoryId.split(',');
      for (let i = 0; i < arr.length; i++) {
        tmpCategoryName.push(Restaurant.Collection.Categories.findOne(arr[i]).name);
      }
    }
    params.$or = [{
      '_customer.type': 'normal'
    }, {
      '_customer.type': {
        $exists: false
      }
    }];
    if (arg.status != '') {
      let status = arg.status.trim().split(',');
      if(status == 'closed'){
        status.push('partial');
        params.status = {
          $in: status
        };
      }else{
        params.status = {
          $in: status
        };
      }
    }
    var fromDate = moment(arg.fromDate, "YYYY/MM/DD HH:mm").toDate();
    var toDate = moment(arg.toDate, "YYYY/MM/DD HH:mm").toDate();
    var customerId = arg.customerId;
    var exchange = Restaurant.Collection.ExchangeRates.findOne({}, {
      sort: {
        _id: -1
      }
    });
    var categoryId = arg.categoryId;

    /****** Title *****/
    data.title = Restaurant.Collection.Company.findOne();

    if (fromDate != null && toDate != null) params.saleDate = {
      $gte: fromDate,
      $lte: toDate
    };
    if (customerId != null && customerId != "") params.customerId = customerId;


    var header = {};
    header.staffId = "ទាំងអស់";
    if (arg.staffId != '') {
      params.staffId = arg.staffId;
      header.staffId = Meteor.users.findOne(arg.staffId).profile.username;
    }

    header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    if (arg.status == 'active') {
      header.status = 'កំពុងលក់';
    } else if (arg.status == 'closed') {
      header.status = 'ទូរទាត់រួច ជំពាក់';
    } else {
      header.status = 'បោះបង់';
    }

    var customer = "ទាំងអស់",
      category = "ទាំងអស់";
    if (customerId != null && customerId != "")
      customer = Restaurant.Collection.Customers.findOne(customerId).name;

    if (tmpCategoryName.length > 0)
      category = tmpCategoryName.join(', ');
    header.customer = customer;
    header.category = category;

    /****** Header *****/
    data.header = header;
    var saleDetailObj = {};
    var total = 0;
    var sales = Restaurant.Collection.Sales.find(params);
    console.log(params);
    sales.forEach((sale) => {
      groupSaleDetail(sale, saleDetailObj, tmpCategoryName);
    });
    for (let k in saleDetailObj) {
      for (let j in saleDetailObj[k].status) {
        for (let d in saleDetailObj[k].status[j]) {
          saleDetailObj[k].totalAmount += saleDetailObj[k].status[j][d].amount;
          saleDetailObj[k].totalQty += saleDetailObj[k].status[j][d].qty;
          total += saleDetailObj[k].status[j][d].amount;
        }
      }
    }
    var content = [saleDetailObj];
    // data.grandTotal = content.grandTotal;
    // data.grandTotalCost = content.grandTotalCost;
    //return reportHelper;
    /****** Content *****/
    if (content.length > 0) {
      data.content = content;
      data.footer.total = numeral(total).format('0,0');
      data.footer.totalInDollar = numeral(total / exchange.rates[0].rate).format('0,0.00');
    }
    return data;
  }
});

let groupSaleDetail = (sale, saleDetailObj, tmpCategoryName) => {
  let selector = {};
  selector.saleId = sale._id;
  if (tmpCategoryName.length > 0) {
    selector['_product._category.name'] = {
      $in: tmpCategoryName
    };
  }
  let saleDetails = Restaurant.Collection.SaleDetails.find(selector, {
    sort: {
      '_product.name': 1
    }
  });
  saleDetails.forEach((saleDetail) => {
    if (_.isUndefined(saleDetailObj[saleDetail.productId])) {
      saleDetailObj[saleDetail.productId] = {};
      saleDetailObj[saleDetail.productId].totalAmount = 0;
      saleDetailObj[saleDetail.productId].totalQty = 0;
      saleDetailObj[saleDetail.productId].productName = saleDetail._product.name + ` (${saleDetail._product._unit.name})`;
      saleDetailObj[saleDetail.productId].actualPrice = saleDetail.price;
      saleDetailObj[saleDetail.productId].status = {};
      saleDetailObj[saleDetail.productId].status[sale.status] = {};
      saleDetailObj[saleDetail.productId].status[sale.status][saleDetail.discount] = {
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
