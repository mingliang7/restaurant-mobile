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
    data.title = Restaurant.Collection.Company.findOne();
    data.header.date = params.date;
    let tomorrow = moment(params.date, 'YYYY-MM-DD').add('1', 'days').toDate();
    console.log(tomorrow);
    let materials = Restaurant.Collection.Materials.find({
      _outstandingAmount: {
        $elemMatch: {
          reduceStockDate: {
            $lt: tomorrow
          }
        }
      }
    });
    let lastOs = [];
    let order = 0;
    if(materials.count()>0){
      materials.forEach((material)=>{
        let tmpArr = [];
        if(material._outstandingAmount){
          material._outstandingAmount.forEach((os)=>{
            if(os.reduceStockDate < tomorrow){
              os.name = material.name;
              tmpArr.push(os);
            }
          });
        }
        lastOs.push(tmpArr.last());
      });
    }
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
