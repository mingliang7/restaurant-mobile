Meteor.methods({
  removeVipcard(id) {
    Restaurant.Collection.Vipcards.remove(id);
  },
  getVipCard(name) {
    let expired = moment(new Date()).format('YYYY-MM-DD');
    let vipcard = Restaurant.Collection.Vipcards.findOne({
      name: name
    });
    if (vipcard == undefined) {
      return {
        message: {
          error: 'Vipcard មិនត្រឹមត្រូវ'
        }
      };
    }
    if (expired > moment(vipcard.expiredDate).format('YYYY-MM-DD')) {
      return {
        message: {
          error: 'Vipcard ផុតកំណត់'
        }
      };
    } else {
      return {
        value: vipcard.value,
        _id: vipcard._id
      }
    }
  }
});
