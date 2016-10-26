var $ = window.$;

var app = {

  init: function(){
    app.render();
  },
  render: function(){
    //do all the visual stuff

    // preload background image (do I need this with window.load below?)
    init();
    function init(){
      var $bgImage = new Image();
      $bgImage.onload = function(){
        $('.photo-container').css('background-image', 'url(/images/background-header2.jpeg)');
      };

      $bgImage.src = '/images/background-header2.jpeg';
    }
    // on window load, fade in image container
    $(window).load(function() {
      $('div.hidden').fadeIn(1000).removeClass('hidden');
    });

    // hover developer/designer
    $('.hover-text').hover(function(){
      $(this).textShake(500, 100, $(this).data('maintext'), $(this).data('shaketext'), function(){
        // console.log('Do something.');
      });
    },function(){
      $(this).textShake(500, 100, $(this).data('shaketext'), $(this).data('maintext'), function(){
        // console.log('Do something again xD.');
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
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
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