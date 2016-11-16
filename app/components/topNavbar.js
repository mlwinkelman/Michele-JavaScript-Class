
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

      // Closes the responsive Menu when menu bar is clicked
      $('.navbar-header').click(function(){
        $('.collapse').removeClass('in');
        switch(window.location.pathname){
        case '/pages/r_todo.html':
        case '/pages/d3PieChart.html':
          // changes anchors back to gray
          $('.navbar-custom .nav li a').css('color', '#555555');
          $('.navbar-custom .navbar-brand').css('color', '#555555');
          break;
        }
      });
      // Changes Menu items to white (on portfolio pages) when responsive menu is clicked
      $('#bs-example-navbar-collapse-1').on('show.bs.collapse', function(){
        $('.navbar-custom .nav li a').css('color', '');
        $('.navbar-custom .navbar-brand').css('color', '');
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