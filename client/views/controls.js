Template.control.events({
  'submit form': function(e) {
    e.preventDefault();
    //console.log(this);

    var post = {
        name: this.name,
        first: $(e.target).find('[name=first]').val(),
        growth: $(e.target).find('[name=growth]').val()
    }

    Meteor.call('post', post);
  }
});