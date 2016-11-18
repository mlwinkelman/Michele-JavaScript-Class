var $ = window.$;
// var Tipped = window.Tipped;

var app = {

  init: function(){
    var html = '';
    var rgbColor;

    //generate random rgb value by multiplying random number by 256 (rgb values)
    function randomRgbValue(){
      return Math.floor(Math.random() * 256 );
    }

    // generates an rgb color by concatenating three random rgb values into this string format: "rgb(a,b,c)"
    function randomColor() {
      var color = 'rgb(';
      color += randomRgbValue() + ',';
      color += randomRgbValue() + ',';
      color += randomRgbValue() + ')';
      return color;
    }

    function print(message) {
      var outputDiv = document.getElementById('output');
      outputDiv.innerHTML = message; // similar to document.write
      // $('#output').css('width', '80vw');
    }

    // // loop to create divs filled with rgbColor
    for (var i = 0; i < 120; i += 1) {
      rgbColor = randomColor();
      html += '<span class="dot toolTip" style="background-color:' + rgbColor + '"></span>';
    }
    app.render();
    // prints the string to the browser
    print(html);
    // Tipped.create('.toolTip', randomColor, {});
  },
  render: function(){
    $('.main-container').fadeIn(1000, function(){
      // display:'block' changes css style from display:none and is the callback or "complete" argument of the fadeIn function
      // $('#output').addClass('ready');
    }).css({display:'block'});

    
    
    
    
  }
};


module.exports = app;