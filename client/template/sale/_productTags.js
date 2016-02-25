Template.categoryTags.created = function() {
  Session.set('categoryTags', {tags: {}})
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("category", Router.current().params.categoryId);
  });
}

Template.categoryTags.rendered = function() {
  this.autorun(() => {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide;
    }
  })
}

Template.categoryTags.helpers({
  categoryTags(){
    let categoryId = Router.current().params.categoryId;
    let category = Restaurant.Collection.Categories.findOne(categoryId);
    let list = [];
    for(let i = 0 ; i < category.tags.length; i++){
      list.push({label: category.tags[i], value: category.tags[i]})
    }
    return _.sortBy(list, function(e) { return e.label});
  }
})

Template.categoryTags.events({
  'change .categoryTag'(e){
    let categoryTags = Session.get('categoryTags');
    let currentTarget = $(e.currentTarget);
    if(currentTarget.prop('checked')){
      categoryTags.tags[currentTarget.val()] = currentTarget.val();
    }else{
      delete categoryTags.tags[currentTarget.val()]
    }
    console.log(categoryTags);
    Session.set('categoryTags', categoryTags);
  },
  'click .search-tags'(){
    let tags = [];
    let categoryTags = Session.get('categoryTags');
    if(!_.isEmpty(categoryTags.tags)){
      for(let k in categoryTags.tags){
        tags.push(categoryTags.tags[k]);
      }
    }
    categoryTags.search = tags
    Session.set('categoryTags',categoryTags);
    // Meteor.subscribe('productByCategory', Router.current().params.categoryId, Session.get('limited'), categoryTags.search);
  }
});
