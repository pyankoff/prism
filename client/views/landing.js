Template.landing.events({
  'click #moreClick': function (evt) {
    $('html, body').animate({
    scrollTop: $("#more").offset().top
    }, 400);
  }
});