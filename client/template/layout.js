Template.layout.onRendered(function () {
  $(window).keydown(function (e) {
    if (e.which == 13 && e.ctrlKey) {
      Meteor.call('insertSale', undefined, moment().toDate(), (err, result) => {
        if (err) {
          Bert.alert(err.message, 'danger', 'growl-bottom-right')
          IonLoading.hide()
        } else {
          IonLoading.hide()
          Session.set('invoiceId', result.sid)
          Router.go(`/restaurant/sale/${result.tableLocationId}/table/${result.tableId}/saleInvoice/${result.sid}`)
        //  Router.go(`/restaurant/saleList/location/${tableLocationId}/table/${tableId}/checkout/${result}`)
        }
      })
    }
  })
})
Template.layout.helpers({
  approved(currentUser) {
    debugger
  }
})

Template.layout.events({
  'click .sign-out'() {
    Meteor.logout()
    Bert.alert('ចាកចេញបានជោគជ័យ!', 'success', 'fixed-top')
  },
  'click .home'() {
    Router.go('home')
  },
  'click .data'() {
    Router.go('restaurant.data')
  },
  'click .setting'() {
    Router.go('restaurant.setting')
  },
  'click .sale'() {
    Router.go('/restaurant/selectTable')
  },
  'click .activeSaleList'() {
    Router.go('/restaurant/payment')
  },
  'click .report'() {
    Router.go('restaurant.report')
  }
})
