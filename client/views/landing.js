Template.landing.events({
  'click .moreClick': function (evt) {
    $('html, body').animate({
    scrollTop: $("#more").offset().top
    }, 400);
  },
  'click .intro': function (evt) {
    evt.preventDefault();
    Router.go('intro');
  }
});

Template.header.events({
  'click .moreClick': function (evt) {
    $('html, body').animate({
    scrollTop: $("#more").offset().top
    }, 400);
  },
  'click .contactsClick': function (evt) {
    $('html, body').animate({
    scrollTop: $("#contacts").offset().top
    }, 400);
  }
});