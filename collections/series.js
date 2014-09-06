Series = new Meteor.Collection('series');

Meteor.methods({
  post: function(postAttributes) {
    var seriesValues = [];
    var first = parseInt(postAttributes.first);
    var growth = parseInt(postAttributes.growth)/100;

    for (var i = 0; i < 12; i++) {
      seriesValues.push(first * Math.pow(1+growth, i));
    };
    var seriesId = Series.findOne()._id;
    Series.update(seriesId, 
      {name: 'EBITDA', values: seriesValues});
  }
});