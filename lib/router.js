Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('landing', {path: '/'});
  this.route('landing2', {path: '/2'});
  this.route('model', {
    path: '/model/:name',
    waitOn: function() {
      return [
      Meteor.subscribe('parameter', this.params.name),
      ];
    },
    data: function() {
      return Series.find().fetch();
        //children: Series.find({parent = this.params.name}).fetch()};
  }
  });
});