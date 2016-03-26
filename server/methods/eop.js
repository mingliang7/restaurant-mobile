Meteor.methods({
  removeEop(id){
     return Restaurant.Collection.EndOfProcess.remove(id);
  },
  findLastRecord(id){
    let eop = Restaurant.Collection.EndOfProcess.findOne({}, {sort: {_id: -1}});
    if(id == eop._id){
      return true;
    }
    return false;
  }
});
