
// // base framework
import $ from 'jquery';

// // legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// // import our styles
import './stylesheets/base.scss';
import home from './pages/home';
import navbar from './components/navbar';
import todoController from './pages/todo';
import d3example from './pages/d3example';
import threeExample from './pages/threeExample';
import bbtodoController from './pages/bb_todo';
// import multimediaController from './pages/multimedia';

// on document load
$(function(){

  // Kick off the app!
  console.log('%c App Started', 'color:green');

// launch navbar
  navbar.init();

  // My First Router: which page are we on???
  switch(window.location.pathname){
  case '/':
    home.init();
    break;
  case '/pages/bb_todo.html':
    new bbtodoController();
    break;
  case '/pages/todo.html':
    todoController.init();
    break;
  case '/pages/multimedia.html':
    console.log('multimedia page started');
    break;
  case '/pages/d3example.html':
    d3example.init();
    break;
  case '/pages/threeExample.html':
    threeExample.init();
    break;
  }


  console.log('=====================================');
  console.log('Please hire me! mlwinkelman@gmail.com');
  console.log('=====================================');


});
