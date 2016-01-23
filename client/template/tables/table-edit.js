Template.tableEdit.helpers({
    table: function () {
        var template = Template.instance();
        return Table.findOne({_id: template.data.id});
    }
});

AutoForm.hooks({
    tableEdit:{
        onSuccess(formType, result){
            Bert.alert('Updated', 'success', 'growl-bottom-right');
            IonModal.close();
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
        }
    }
});