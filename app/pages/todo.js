
var $ = window.$;
var Handlebars = window.Handlebars;
import lscache from 'lscache';

  
var database = [];  // storage of all data which we'll loop through (MVC design pattern)
var model = {  // model has no visual display in an MVC
  init: function(){
    var savedData = lscache.get('todos');
    if (savedData) {
      database = savedData;
    } else {
      database = [];
    }
  },
  save: function(){
    var dataToSave = JSON.stringify(database);  // stringify and parse are opposite - JSON only provides these 2 functions
    lscache.set('todos', dataToSave);
  },
  get: function(){
    return database;
  }
};


var view = $('script[type="text/x-template"]').html(); // visual stuff - 'dumb' template
    
var controller = {  // what mediates between the view and the model
  init: function(){  // property called init that stores a function
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    // start everything up and get it ready
    controller.compiledTemplate = Handlebars.compile(view); // pass view to handlebars to view/store compiled  
                                                    // template (handelbars only has two functions: 
                                                   // takes data object and puts into our compiled template)
    controller.renderTemplates();  // when controller runs, it renderes the templates
  },
  render: function(compiledTodos){  // receive list of compiled templates
    // do all the visual stuff
    controller.destroyEventHandlers();
    $('.todo-list').html(compiledTodos.join(''));
    controller.createEventHandlers();  // then controller creates event handlers
  },
  renderTemplates: function(){
    var compiledTodos = [];
    
    model.get().forEach(function(item, index){    // loop that runs once for each item
      item.id = index + 1;      // provides template with the id (and adds numbering starting with 1)
      var renderedTodo = controller.compiledTemplate(item);    // passes item to compiled template
      compiledTodos.push(renderedTodo);
    });
    controller.render(compiledTodos);     // where all the logic is - does all the work
    model.save();  // saves database
  },
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
  },
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);     // using jquery to select add button
    $('input[type="checkbox"]').on('change', controller.checkedHandler); 
    $('.close').on('click', controller.removeHandler);  
  },
  removeHandler: function(event){
    // which one was clicked?
    var index = $(event.currentTarget).parent().parent().index(); // pass current target to jquery
    // update database
    model.get().splice(index, 1);  // array.splice - remove item starting at index and remove 1 item
    // update the view
    controller.renderTemplates();
  },
  checkedHandler: function(event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index(); // pass current target to jquery
    // update the database
    model.get()[index].completed = !model.get()[index].completed;   // current value changes to opposite
    // view updates automatically, yay HTML!
    model.save();  // saves database
  },
  addTodoHandler: function(){
    var newTitle = $('.add-input').val(); // use jquery to grab value of input
    if (newTitle === '') return;  // return signals the end (no "else")
    model.get().push({ // this is an object
      title: newTitle,
      completed: false
    });
    $('.add-input').val('');  // (getter and setter) 
    controller.renderTemplates();
  }
};

module.exports = controller;
