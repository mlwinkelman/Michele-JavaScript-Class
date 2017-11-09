var $ = window.$;

var app = {

  init: function(){

    app.render();

  },
  render: function(){
    $('.main-container').fadeIn(1000, function(){
      // display:'block' changes css style from display:none and is the callback or "complete" argument of the fadeIn function
      // $('#output').addClass('ready');
    }).css({display:'block'});

    // Project Site Button toggles to read "Coming Soon" when clicked (to be removed when project site is live)
    $('.button').click(function() {
      $('.click-button').toggle();
    });
  }
};


module.exports = app;