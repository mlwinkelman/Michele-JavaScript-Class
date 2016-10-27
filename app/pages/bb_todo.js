// Controller - managing logic and user input

// import jquery & backbone
// var $ = window.$;
import Backbone from 'backbone';
import bbTodoModel from '../models/bb_todoModel';
import bbTodoView from '../views/bb_todoView';

var Controller = Backbone.View.extend({
  model: new bbTodoModel(), // need to call new to get the model in
  initialize: function(){
    this.model.fetch();  // tells model to get data from lscache
    this.render();
  },
  render: function(){
    // get list of todos
    var todos = this.model.get('todos');
    if (this.view !== undefined) {
      this.view.removeHandlers();
    }
    // pass todos in when we instantiate it; store the view
    this.view = new bbTodoView(todos, this);
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





