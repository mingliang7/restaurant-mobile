Template._selectRole.helpers({
  roles() {
    let userId = Template.instance().data.id;
    let user = Meteor.users.findOne(`${userId}`);
    return user;
  }
});


AutoForm.hooks({
  selectRole: {
    onSubmit(doc) {
      Meteor.call('updateUserRole', doc._id, doc.roles, (err, result) => {
        if (err) {
          Bert.alert('មិនបានជោគជ័យ', 'danger', 'growl-bottom-right');
        } else {
          Bert.alert('កណត់តួនាទីបានជោគជ័យ', 'success', 'growl-bottom-right')
        }
      });
      return false;
    }
  }
})
