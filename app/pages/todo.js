
var $ = window.$;
var Handlebars = window.Handlebars;
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';
    
var controller = {  // what mediates between the view and the model
  init: function(){  // property called init that stores a function
    model.init();
    // cache a jquery selectors
    controller.addButton = $('.btn-add');
    // compile todo item template

    /* pass view to handlebars to view/store compiled  
    template (handelbars only has two functions: 
    takes data object and puts into our compiled template)*/
    controller.compiledTemplate = Handlebars.compile(view); 
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
    var compiledTodos = [];
    // model.get - get the database (an array)
    // then loop that runs once for each item
    model.get().forEach(function(item, index){
      // create an id equal to index + 1
      // the +1 adds numbering starting with 1 to make it more human readable
      // provides template with the id which is required by our view 
      item.id = index + 1;
      // replace {{id}} with the items id value (passes item to compiled template to produce rendered template and data (handlebars))
      var renderedTodo = controller.compiledTemplate(item);
      // add this rendered todo to our list of todos  
      compiledTodos.push(renderedTodo);
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
  },
  // add the event handlers
  createEventHandlers: function(){
    // using jquery to select add button
    controller.addButton.on('click', controller.addTodoHandler);     
    $('input[type="checkbox"]').on('change', controller.checkedHandler); 
    $('.close').on('click', controller.removeHandler);  
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
    // view updates automatically, yay HTML!
    model.save();  // saves database
  },
  // event handler for the ADD button
  // creates a new todo
  addTodoHandler: function(){
    // use jquery to grab value of input
    var newTitle = $('.add-input').val();
    // return signals the end (no "else") 
    if (newTitle === '') return;  
    model.get().push({ // this is an object
      title: newTitle,
      completed: false
    });
    $('.add-input').val('');  // (getter and setter) 
    controller.renderTemplates();
  }
};

module.exports = controller;
