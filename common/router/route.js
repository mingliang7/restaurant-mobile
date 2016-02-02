Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {
    this.route('home', {
        path: '/'
    });
    this.route('book.tags', {
        path: '/tags',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
    this.route('profile.interest', {
        path: '/profile/:id/interest',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
    this.route('book.categories', {
        path: '/categories',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
    this.route('book.categoriesShow', {
        path: '/categories/:id',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
    this.route('books', {
        path: '/books',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
});