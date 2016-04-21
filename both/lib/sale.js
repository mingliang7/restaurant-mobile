Sale = {
  sumSaleDetail(saleId) {
    let subTotal = 0;
    let total;
    let index = 0;
    let hasDiscount = false;
    let text = '';
    let sale = Restaurant.Collection.Sales.findOne(saleId);
    let saleDetails = Restaurant.Collection.SaleDetails.find({
      saleId: saleId
    });
    saleDetails.forEach((saleDetail) => {
      if(saleDetail.discount == 100){
        hasDiscount = true;
      }
      if (index < 2) {
          text += `${Restaurant.Collection.Products.findOne(saleDetail.productId).name},`;
      }
      index++;
      subTotal += saleDetail.amount;
    });
    total = subTotal * (1 - sale.discount / 100);
    sale.text = `${sale._id} | ${total} | ${text}  `;
    if(hasDiscount){
      Restaurant.Collection.Sales.direct.update(saleId, {
        $set: {
          total: total,
          subTotal: subTotal,
          paidAmount: 0,
          balanceAmount: total,
          text: sale.text
        }
      });
    }else{
      if(total == 0){
        Restaurant.Collection.Sales.direct.remove(saleId);
      }else{
        Restaurant.Collection.Sales.direct.update(saleId, {
          $set: {
            total: total,
            subTotal: subTotal,
            paidAmount: 0,
            balanceAmount: total,
            text: sale.text
          }
        });
      }
    }
  },
  tags: {
    name: ['ទឹកដោះគោ',
            'មីកន្តាំង',
            'មីកន្ទាំង',
            'តែ',
            'កាហ្វេ',
            'សាច់ជ្រូក',
            'សាច់គោ',
            'សាច់ទា',
            'សាច់មាន់',
            'ក្រពះពោះវៀន',
            'គ្រឿងក្នុុុុង',
            'ត្រី',
            'ត្រីងៀត',
            'ត្រីរ៉ស់',
            'ត្រីតាអោន',
            'ឆ្អឹងជំនី',
            'ម្នាស់',
            'ឡុកឡាក់',
            'ប្រហិត',
            'គ្រឿងសមុទ្រ',
            'ខាត់ណា',
            'មីថៃ',
            'មីខ្មែរ',
            'មីសួរ',
            'ឆា',
            'ស្ងោរ',
            'ចៀន',
            'ក្តៅ',
            'ត្រជាក់',
            'ទឹកត្រីស្វាយ',
            'ទឹកកក',
            'បន្លែ',
            'ម្ទេស',
            'ព្រៃ',
            'ផ្អែម',
            'ញាំ',
            'តុងយាំុ',
            'ខគោ',
            'សាច់ជ្រូូក',
            'មីកន្តាំង',
            'ស្ពៃជូរ',
            'ស្ពៃកំប៉ុង',
            'ស្ពៃជ្រក់',
            'ប្រេងខ្យង',
            'គល់ស្លឹកគ្រៃ'
          ]
  }
}
Sale.State = new ReactiveObj();
