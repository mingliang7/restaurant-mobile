Meteor.methods({
  getStockInGroupNameReport(arg) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };

    var params = {};
    if (arg.materialCategoryId != '') {
      params["_material._materialCategory._id"] = arg.materialCategoryId;
    }
    var fromDate = moment(arg.fromDate, "YYYY/MM/DD HH:mm").toDate();
    var toDate = moment(arg.toDate, "YYYY/MM/DD HH:mm").add('1', 'days').toDate();
    params.stockInDate = {
      $gte: fromDate,
      $lt: toDate
    };

    data.title = Restaurant.Collection.Company.findOne();
    // var customer = "ទាំងអស់", status = "ទាំងអស់", staff = "ទាំងអស់";
    // var status =  status = "ទាំងអស់";
    if (fromDate != null && toDate != null) params.stockInDate = {
      $gte: fromDate,
      $lt: toDate
    };
    var header = {};
    header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    header.category = "ទាំងអស់";
    header.type= "ទាំងអស់";
    if(arg.materialCategoryId != ''){
      header.category = Restaurant.Collection.MaterialCategories.findOne(arg.materialCategoryId).name;
    }
    if(arg.type != ''){
      params.type = arg.type;
      header.type = arg.type == 'order' ? "នាំចូល" : "កែសម្រួល";
    }
    // if (customerId != null && customerId != "") {
    //     params.customerId = customerId;
    //     customer = Restaurant.Collection.Customers.findOne(customerId).name;
    // }
    var sale = Restaurant.Collection.StockIn.aggregate(
      [{
        $match: params
      }, {
        $group: {
          _id: "$materialId",
          materialName: {
            $last: "$_material.name"
          },
          avgPrice: {
            $avg: "$price"
          },
          totalQuantity: {
            $sum: "$qty"
          },
          avgAmount: {
            $sum: {
              $multiply: ["$price", "$qty"]
            }
          }
        }
      }, {
        $sort: {
          materialName: 1
        }
      }]);
    // header.customer = customer;

    /****** Header *****/
    data.header = header;
    var content = calculateSaleHelper(sale);

    /****** Content *****/
    if (content.length > 0) {
      data.content = content;
    }
    return data;

  }
});

function calculateSaleHelper(sl) {
  var saleList = [];
  var i = 1;
  sl.forEach(function(s) {
    // grandTotal += s.total;
    s.order = i;
    s.stockInDate = moment(s.stockInDate).format("DD-MM-YY, HH:mm:ss");
    i++;
    saleList.push(s);
  });
  return saleList;
}
