// Controller - managing logic and user input

// import jquery & backbone
// var $ = window.$;
import Backbone from 'backbone';
import rTodoModel from '../models/r_todoModel';
import rTodoView from '../views/r_todoView';

var Controller = Backbone.View.extend({
  model: new rTodoModel(), // need to call new to get the model in
  initialize: function(){
    var that = this;
    // fetch will call render when done
    this.model.fetch(function(){
      that.render();
    });  // tells model to get data
  },
  render: function(){
    // get list of todos
    var todos = this.model.get('todos');
    if (this.view !== undefined) {
      this.view.removeHandlers();
    }
    // pass todos in when we instantiate it; store the view
    this.view = new rTodoView(todos, this);
  },
  addTodo: function(newTitle){ // adds the todo (don't confuse with function of same name in model)
    this.model.addTodo(newTitle);
    this.render();
  },
  addKeypress: function(event, newTitle){
    if (event.which === 13) {
      this.addTodo(newTitle);
    }
  },
  removeTodo: function(id){
    if (id >= 0) {
      this.model.removeTodo(id);
      this.render();
    }
  },
  editTodo: function(id, newTitle){
    if (id >= 0) {
      this.model.editTodo(id, newTitle);
      this.render();
    }
  },
  changeComplete: function(id){
    if (id >= 0) {
      this.model.completeTodo(id);
      this.render();
    }
  }
});

module.exports = Controller;





