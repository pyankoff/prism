Meteor.publish('parameter', function(seriesName) {
  return Series.find({ $or: [{name: seriesName}, {parents: seriesName}] });
});