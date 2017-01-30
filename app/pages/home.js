var $ = window.$;

var app = {

  init: function(){
    // workaround for chrome bug where <a> tags don't work with #
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (window.location.hash && isChrome) {
      setTimeout(function () {
        var hash = window.location.hash;
        window.location.hash = '';
        window.location.hash = hash;
      }, 300);
    }

   // preload background image, then call render function
    var $bgImage = new Image();
    $bgImage.onload = function(){
      app.render();
    };
    // $bgImage.src = '/images/background-header2.jpeg';
    $bgImage.src = '/images/meibnpi1rc8-nathan-anderson.jpg';
    // $bgImage.src = '/images/Background-Road.jpeg';

  },
  render: function(){
    //do all the visual stuff
    $('.photo-container').css('background-image', 'url(/images/meibnpi1rc8-nathan-anderson.jpg)');
    $('.main-container').fadeIn(1000, function(){
      // display:'block' changes css style from display:none and is the callback or "complete" argument of the fadeIn function
      $('.preloader').addClass('hidden');
    }).css({display:'block'});


    // hover text
    $('.hover-text').hover(function(){
      $(this).textShake(500, 100, $(this).data('maintext'), $(this).data('shaketext'), function(){
      });
    },function(){
      $(this).textShake(500, 100, $(this).data('shaketext'), $(this).data('maintext'), function(){
      });
    });



  }
};



    /**
 * @name       Textshake
 * @author     Mogeli lortkipanidze <lortkipanidzemogeli@gmail.com>
 * @version    0.1.1
 *
 * @requires   jQuery
 *
 * Copyright (c) 2016 by Mogeli lortkipanidze
 */

(function($){
  $.fn.textShake = function(time, step,  maintext, shaketext, afteraction){
    var alphabet = 'abcdefghijklmnopqrstuvwxyz',
    // var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      el = $(this),

      shakeInterval = setInterval(function(){

        time -= step;
        var element;
        if(time - step >= 0) {
          element = maintext.split('');
          for (var l = 0; l < element.length; l++) {
            element[l].match(/[a-z]/gi) && (element[l] = alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
          }
          el.text(element.join(''));
        }
        else {
          if(0 >=time) {
            clearInterval(shakeInterval);
            el.text(shaketext);
            if(typeof afteraction == 'function') {
              afteraction();
            }
          }
        }


      }, step);
  };
}( $ ));



module.exports = app;