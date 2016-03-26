Template._fetch_material.rendered = function(){
  Session.set('materialQuery', undefined);
};

Template._fetch_material.helpers({
  fetchMaterials(){
    return ReactiveMethod.call('fetchMaterials', Session.get('materialQuery'));
  }
});

Template._fetch_material.events({
  "click [name='materials']": function(event){
    let splitValue = event.currentTarget.value.split(' ');
    $('[name="materialName"]').val(`${this.label}(${splitValue[0]})`);
    $("[name='materialId']").val(splitValue[2]);
    $("[name='price']").val(splitValue[1]);
  },
  'keyup [name="materialSearch"]'(e){
    Session.set('materialQuery', e.currentTarget.value);
  }
});


AutoForm.hooks({
  fetchMaterial:{
    onSubmit(doc){
      return false;
    }
  }
});
