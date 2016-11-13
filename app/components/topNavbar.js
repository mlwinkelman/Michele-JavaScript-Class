
var $ = window.$;
import topnavbarTpl from 'text!../views/topNavbar.tpl';

var app = {
  init: function(){
    app.render();
  },
  render: function(){
    $('nav').html(topnavbarTpl);

    (function($) {
      'use strict'; // Start of use strict

      // jQuery for page scrolling feature - requires jQuery Easing plugin
      $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 5)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
      });

      

      // Closes the Responsive Menu on Menu Item Click
      $('.navbar-collapse ul li a').click(function(){ 
        $('.collapse').removeClass('in');
      });

      // Offset for Main Navigation
      $('#mainNav').affix({
        offset: {
          top: 100
        }
      });

    })($); // End of use strict

  }
};

module.exports = app;