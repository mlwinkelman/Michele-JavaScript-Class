
// // base framework
import $ from 'jquery';

// // legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import home from './pages/home';
// import navbar from './components/navbar';
import topNavbar from './components/topNavbar';
// import smartFixedNavigation from './components/smartFixedNavigation';
import todoController from './pages/todo';
import d3example from './pages/d3example';
import d3PieChart from './pages/d3PieChart';
import threeExample from './pages/threeExample';
import bbtodoController from './pages/bb_todo';
import rTodoController from './pages/r_todo';
import photoSearchController from './pages/photoSearch';
// import multimediaController from './pages/multimedia';

// on document load
$(function(){


// $.onreadystatechange(function(){ 
  // if($.readyState == 'loaded' || $.readyState == 'complete') {
      // call code to execute here.


  // Kick off the app!
  console.log('%c App Started', 'color:green');

// launch navbar
  // navbar.init();

// launch topNavbar
  topNavbar.init();


  // My First Router: which page are we on???
  switch(window.location.pathname){
  case '/':
    home.init();
    // would my nav scroll-to for home page go here?
    $('.about').attr('href', '#about');
    $('.web-portfolio').attr('href', '#portfolio');
    $('.design-portfolio').attr('href', '#portfolio-design');
    $('.contact-me').attr('href', '#contact-me');
    $('.home').attr('href', '#home');
    break;
  case '/pages/bb_todo.html':
    new bbtodoController(); // use backbone pattern
    break;
  case '/pages/r_todo.html':
    new rTodoController(); // use backbone pattern
    break;
  case '/pages/todo.html':
    todoController.init();
    break;
  // case '/pages/multimedia.html':
  //   console.log('multimedia page started');
  //   break;
  case '/pages/d3example.html':
    d3example.init();
    break;
  case '/pages/d3PieChart.html':
    d3PieChart.init();
    break;
  case '/pages/threeExample.html':
    threeExample.init();
    break;
  case '/pages/photoSearch.html':
    new photoSearchController(); // use backbone pattern
    break;
  }


  console.log('=====================================');
  console.log('Please hire me! mlwinkelman@gmail.com');
  console.log('=====================================');

  // } 


});
