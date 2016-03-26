Restaurant = {};
Restaurant.Collection = {};
Restaurant.Schema = {};
Restaurant.List = {};
Restaurant.ReactiveState = {};
Restaurant.ReactiveState.Eop = new ReactiveObj();
Restaurant.Roles = {
  checkRoles(userId, roles) {
    if (!Roles.userIsInRole(userId, roles)) {
      Bert.alert('អ្នកមិនមានសិទ្ធមើលទំព័រនេះទេ', 'danger');
      Router.go('/');
    }
  }
}
