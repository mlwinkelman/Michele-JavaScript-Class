var $ = window.$;

var app = {

  init: function(){

    // preload background image, then call render function
    var $bgImage = new Image();
    $bgImage.onload = function(){
      app.render();
    };
    $bgImage.src = '/images/Background-Bridge.jpeg';
    // app.render();
    
  },

  render: function(){
    // console.log('123');

    //do all the visual stuff
    $('.photo-container-quiz').css('background-image', 'url(/images/Background-Bridge.jpeg)');
    $('.main-container').fadeIn(1500, function(){
      // display:'block' changes css style from display:none and is the callback or "complete" argument of the fadeIn function
    }).css({display:'block'});

    // two dimensional array
    var quizQuestions = [
      ['In which U.S. city is the Golden Gate Bridge located?', 'san francisco'],
      ['In which state would you find Mount Rushmore?', 'south dakota'],
      ['Graceland, the famous mansion of Rock and Roll legend Elvis Presley is located in which U.S. city?', 'memphis'],
      ['The Devils Tower National Monument can be found in which state?', 'wyoming'],
      ['Stone Mountain is claimed to be the largest exposed granite stone in the world. In which state can this landmark be found?', 'georgia']
    ];

    var correctAnswers = [];
    var incorrectAnswers = [];
    var numberOfCorrectAnswers = 0;
    var numberOfIncorrectAnswers = 0;
    var response;
    var html;

    // $( "div.output" ).toggleClass( "hidden", addOrRemove );

    function print(message) {
      var outputDiv = document.getElementById('quiz-output'); // node
      outputDiv.innerHTML = message; // similar to document.write
      $( '#quiz-output' ).removeClass( 'hidden' );
      // $( '#output' ).toggleClass( "hidden", addOrRemove );
    }

    // function to build ordered lists of correct and incorrect questions when quiz is complete
    function buildList( list ) {
      var listHTML = '<ol>';
      for (var i = 0; i < list.length; i +=1) {
        listHTML += '<li>' + '.  ' + list[i] + '</li>';
      }
      listHTML += '</ol>';
      return listHTML;
    }
    // launch quiz when "start quiz" button is clicked
    $(document).on('click', '.launch-quiz', function() {

      // Loop 
      for ( var i = 0; i < quizQuestions.length; i += 1) { // loop thru each question
        response = prompt(quizQuestions[i][0]); // prompt asks question
        response = response.toLowerCase();
        if (response === quizQuestions[i][1]){ // compare response to answer in array
          numberOfCorrectAnswers += 1;
          correctAnswers.push(quizQuestions[i][0]);
        } else {
          numberOfIncorrectAnswers +=1;
          incorrectAnswers.push(quizQuestions[i][0]);
        }
      }
      
      html = 'You got ' + numberOfCorrectAnswers + ' question(s) right.' + '<br>';
      html += 'You got ' + numberOfIncorrectAnswers + ' question(s) wrong.' + '<br>';
      html += '<h2>You got these questions right:</h2>';
      html += buildList(correctAnswers);
      html += '<h2>You got these questions wrong:</h2>';
      html += buildList(incorrectAnswers);

      // prints the list of correct & incorrect answers to the browser
      print(html);

    });

  }

};

module.exports = app;