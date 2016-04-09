Template.restaurantSaleDetailReport.onRendered(function() {
  $('[name="fromDate"]').datetimepicker();
  $('[name="toDate"]').datetimepicker();
});

Template.restaurantSaleDetailReport.helpers({
  customers() {
    return ReactiveMethod.call('getCustomerList');
  },
  categories() {
    return ReactiveMethod.call('getCategoryList')
  },
  users() {
    return ReactiveMethod.call('getUserList');
  }
});

Template.restaurantSaleDetailReportGen.helpers({
  getNumberOfRow: function(transaction) {
    return transaction.length;
  },
  options: function() {
    // font size = null (default), bg
    // paper = a4, a5, mini
    // orientation = portrait, landscape
    return {
      //fontSize: 'bg',
      paper: 'a4',
      orientation: 'portrait'
    };
  },
  data: function() {
    // Get query params
    //FlowRouter.watchPathChange();
    var query = Router.current().params.query;
    var params = "saleDetailReport";
    Fetcher.setDefault(params, false);
    Fetcher.retrieve(params, 'getSaleDetailReport', query);
    return Fetcher.get(params);
  },
  extractContent(){
    let concate = '';
    let obj = this;
    let index = 0;
    for(let k in obj){
      index = 0;
      concate += `<tr><td>${obj[k].productName}</td>`;
      for(let j in obj[k].status){
        for(let d in obj[k].status[j]){
          let data = obj[k].status[j][d];
          let discount = data.discount == 0 ? '' : `(-${data.discount} %)`;
          if(index > 0){
            // concate += `<tr><td></d><td><b>${data.qty}</b>${discount}</td>
            //           <td  align='right'>${numeral(data.price).format('0,0')}</td>
            //           <td align='right'>${numeral(data.amount).format('0,0')}</td></tr>`
            concate += `<tr><td></d><td><b>${data.qty}</b>${discount}</td>
                      <td  align='right'>${numeral(data.price).format('0,0')}</td>
                      <td align='right'>${numeral(data.amount).format('0,0')}</td></tr>`;
          }else{
            // concate += `<td><b>${data.qty}</b>${discount}</td>
            //             <td align="right">${numeral(data.price).format('0,0')}</td>
            //             <td align="right">${numeral(data.amount).format('0,0')}</td></tr>`;
            concate += `<td><b>${data.qty}</b>${discount}</td>
                        <td align="right">${numeral(data.price).format('0,0')}</td>
                        <td align="right">${numeral(data.amount).format('0,0')}</td></tr>`;
          }
          index++;
        }
      }
      // concate += `<tr><td align="right">សរុបចំនួន</td><td><u><b>${obj[k].totalQty}</b></u></td>
      //         <td align="right"><u><b>${numeral(obj[k].actualPrice).format('0,0')}</b></u></td>
      //         <td align="right"><u><b>${numeral(obj[k].totalAmount).format('0,0')}</b></u></td></tr>`;
      concate += `<tr style="background: #ddd;"><td align="right" colspan="3"></td>
              <td align="right"><u><b>${numeral(obj[k].totalAmount).format('0,0')}</b></u></td></tr>`;
    }
    return concate;
  }

});


AutoForm.hooks({
  restaurantSaleDetailReport: {
    onSubmit(doc) {
      this.event.preventDefault();
      let status = '';
      if (doc.status) {
        doc.status = doc.status.join(',');
        status = doc.status;
      }
      let staffId = doc.staffId === undefined ? '' : doc.staffId;
      let fromDate = moment($('[name="fromDate"]').val()).format('YYYY-MM-DD HH:mm:ss');
      let toDate =  moment($('[name="toDate"]').val()).format('YYYY-MM-DD HH:mm:ss');
      let customerId = doc.customerId === undefined ? '' : doc.customerId;
      let categoryId = doc.categoryId === undefined ? '' : doc.categoryId ;
      let url = `/restaurant/sale-detail-report-gen?fromDate=${fromDate}&toDate=${toDate}&customerId=${customerId}&categoryId=${categoryId}&status=${status}&staffId=${staffId}`;
      this.done(); //reset form
      window.open(url, '_blank');

    },
    onSuccess(formType, result){

    }
  }
});
