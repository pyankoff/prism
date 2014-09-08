Series = new Meteor.Collection('series');

Meteor.methods({
  post: function(postAttributes) {
    var seriesValues = [];
    var seriesName = postAttributes.name;
    var first = parseInt(postAttributes.first);
    var growth = parseInt(postAttributes.growth)/100;

    for (var i = 0; i < 12; i++) {
      seriesValues.push(first * Math.pow(1+growth, i));
    };
    
    var seriesId = Series.findOne({name: seriesName})._id;
    
    Series.update(seriesId, {
      $set: {values: seriesValues}
    });
    Meteor.call('recalculate');
  },

  recalculate: function() {
    var seriesId = Series.findOne({name: 'ebitda'})._id;
    var seriesValues = Series.findOne({name: 'ebitda'}).values;

    var salesValues = Series.findOne({name: 'sales'}).values;
    var costsValues = Series.findOne({name: 'costs'}).values;

    for (var i = 0; i < 12; i++) {
      seriesValues[i] = salesValues[i] - costsValues[i];
    };

    Series.update(seriesId, {
      $set: {values: seriesValues}
    });
  }
});