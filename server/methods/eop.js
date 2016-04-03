Meteor.methods({
  removeEop(id){
     return Restaurant.Collection.EndOfProcess.remove(id);
  },
  findLastDate(){
    let eop = Restaurant.Collection.EndOfProcess.findOne({}, {sort: {_id: -1}});
    let date = '';
    if(eop){
      date = moment(eop.endEopDate).add('1', 'days').format('YYYY-MM-DD');
    }else{
      date = moment().subtract('1', 'days').format('YYYY-MM-DD');
    }
    return date;
  }
});
