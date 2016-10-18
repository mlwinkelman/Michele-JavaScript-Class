// Controller - managing logic and user input

var $ = window.$;
import _ from 'underscore';
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';
    
var controller = {  // what mediates between the view and the model
  init: function(){  // property called init that stores a function
    model.init();
    // cache a jquery selectors
    controller.addButton = $('.btn-add'); 
    // compile template
    controller.compiledTemplate = _.template(view);
    // render the todo item template
    controller.renderTemplates();  // when controller runs, it renders the templates
  },
  // do all the visual stuff
  render: function(compiledTodos){  // receive list of compiled templates
    // remove all the event handlers for the todo app
    // event handlers are functions that get run when an event happens
    controller.destroyEventHandlers();
    // compiled todos is an array
    // we are joining the elements of the array together to make one long string
    // put the long string into the HTML element with a class called "todo-list"
    $('.todo-list').html(compiledTodos.join(''));
    // now that all the todos have been added to the DOM
    // then controller creates all the event handlers for the todo app
    controller.createEventHandlers();  
  },
  renderTemplates: function(){
    // model.get - get the database (an array)
    // then loop that runs once for each item
    var compiledTodos = model.get().map(function(item, index){
      // create an id equal to index + 1
      // the +1 adds numbering starting with 1 to make it more human readable
      // provides template with the id which is required by our view 
      item.id = index + 1;
      // replace {{id}} with the items id value (passes item to compiled template to produce rendered template and data
      return controller.compiledTemplate(item);
    }); // end of for Each
    // pass list of todos to the render function (where all the logic is - does all the work)
    controller.render(compiledTodos);
    // tell the model to save our data (database)
    model.save();
  },
  // remove event handlers from app
  // get ready to re-render
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
    $('.edit').off();
  },
  // add the event handlers
  createEventHandlers: function(){
    // using jquery to select add button
    controller.addButton.on('click', controller.addTodoHandler);
    $('.add-input').on('keypress', controller.addTodoKeypress);     
    $('input[type="checkbox"]').on('change', controller.checkedHandler); 
    $('.close').on('click', controller.removeHandler);
    // edit button handler
    $('.edit').on('click', controller.editHandler);
  },
  addTodoKeypress: function(event){
    if (event.which === 13) {
      // they hit enter!
      controller.addTodoHandler(event);
    }
  },
  // event handler for edit button
  editHandler: function(event){
    // which item to edit??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    // title text disappears
    $item.find('.todo-title').addClass('hidden');
    // text input appears
    $item.find('.todo-title-edit').removeClass('hidden');
    // edit button replaced by save button
    $item.find('.edit').addClass('hidden');
    $item.find('.save').removeClass('hidden');
    // make check when they click on save button
    $item.find('.save').on('click', controller.updateTitle);
    $item.find('.todo-title-edit input').on('keypress', controller.updateTitleKeypress);
  },
  // handler to update title on Enter
  updateTitleKeypress: function(event){
    if (event.which === 13) {
      // they hit enter!
      // console.log(event.which); // or event.keyCode is the same if using jquery
      controller.updateTitle(event);
    }
  },
  updateTitle: function(event){
    // which title??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    $item.find('.save').off(); // turns off event handler
    $item.find('.todo-title-edit input').off(); // turns off event handler
    var newTodoTitle = $item.find('.todo-title-edit input').val();
    // update the database
    model.get()[index].title = newTodoTitle;
    model.save();
    controller.renderTemplates();
  },
  // event handler for the close x button
  // deletes the todo
  removeHandler: function(event){
    // which one was clicked?
    var index = $(event.currentTarget).parent().parent().index(); // pass current target to jquery
    // update database
    model.get().splice(index, 1);  // array.splice - remove item starting at index and remove 1 item
    // update the view
    controller.renderTemplates();
  },
  // event handler for the checkboxes
  checkedHandler: function(event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index(); // pass current target to jquery
    // update the database
    model.get()[index].completed = !model.get()[index].completed;   // current value changes to opposite
    model.save();  // saves database
    controller.renderTemplates();
  },
  // event handler for the ADD button
  // creates a new todo
  addTodoHandler: function(){
    // use jquery.val() to grab value of input
    var newTitle = $('.add-input').val(); // points at .add-input and grabs .val()
    // return signals the end (no "else") so it exits and kills the function
    if (newTitle === '') return;
    // model.get() returns the database
    // push adds and item to the database
    model.get().push({ // this is an object
      title: newTitle,
      completed: false
    });
    // clear the text box
    $('.add-input').val('');  // (getter and setter) 
    // updates the display using all the new data
    controller.renderTemplates();
  }
};

// specifies what will be returned when this file is imported
module.exports = controller;
