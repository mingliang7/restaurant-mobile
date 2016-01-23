Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/'
    });

    this.route('tables', {
        path: '/tables'
    });
    this.route('tables.show',{
       path: '/tables/:id'
    });
    this.route('table.categories', {
       path: '/tables/:id/categories'
    });
    this.route('table.categories.product',{
       path: '/tables/:id/categories/:categoryId'
    });
});