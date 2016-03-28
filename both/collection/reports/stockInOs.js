Restaurant.Schema.StockInOsReport = new SimpleSchema({
  date: {
    type: Date,
    label: "ថ្ងៃទី",
    optional: true
  },
  materialCategoryId:{
    type: 'String',
    label: 'ផ្នែក',
    optional: true,
    autoform: {
      type: 'select',
      firstOption: 'All',
      options(){
        let list = [];
        let materialCategories = Restaurant.Collection.MaterialCategories.find();
        if(materialCategories.count() > 0){
          materialCategories.forEach((materialCategory)=>{
            list.push({label: `${materialCategory.name}`,value: materialCategory._id});
          });
        }
        return list;
      }
    }
  }
});
