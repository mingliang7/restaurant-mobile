Meteor.methods({
  getStockInOsReport(params) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };
    let selector = {};
    data.title = Restaurant.Collection.Company.findOne();
    data.header.date = params.date;
    data.header.materialCategory = params.materialCategoryId == '' ? 'ទាំងអស់' : Restaurant.Collection.MaterialCategories.findOne(params.materialCategoryId).name;
    let tomorrow = moment(params.date, 'YYYY-MM-DD').add('1', 'days').toDate();
    selector._outstandingAmount =  {
        $elemMatch: {
          reduceStockDate: {
            $lt: tomorrow
          }
        }
      };
    if(params.materialCategoryId != '') {
      selector.materialCategoryId = params.materialCategoryId;
    }
    let materials = Restaurant.Collection.Materials.find(selector);
    let lastOs = [];
    let order = 0;
    if(materials.count()>0){
      materials.forEach((material)=>{
        let tmpArr = [];
        if(material._outstandingAmount){
          material._outstandingAmount.forEach((os)=>{
            if(os.reduceStockDate < tomorrow){
              os.name = material.name;
              os.totalBalancePlusTotalQty = os.totalBalance + os.totalQty;
              tmpArr.push(os);
            }
          });
        }
        lastOs.push(tmpArr.last());
      });
    }
    lastOs.sort(function(a,b) {
      if ( a.reduceStockDate < b.reduceStockDate )
          return -1;
      if ( a.reduceStockDate > b.reduceStockDate )
          return 1;
      return 0;
    });
    if(lastOs.length > 0){
      data.content= [];
    }
    lastOs.forEach((os)=>{
      order += 1;
      os.order = order;
      data.content.push(os);
    });
    return data;
  }
});
