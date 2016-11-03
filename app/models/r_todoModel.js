// Model handles anything to do with data

var $ = window.$;
import Backbone from 'backbone';

var model = Backbone.Model.extend({
  defaults: {
    todos: []  // data starts as empty array
  },
  fetch: function(callback){
    var that = this;
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: '/api/todos',
      success: function(todos){
        that.set('todos', todos);
        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  },
  save: function(){
    $.ajax({
      method: 'POST',
      data: {
        todos: JSON.stringify(this.get('todos'))
      },
      url: '/api/todos'
    });
  },
  addTodo: function(newTitle){ // doesn't really add a todo but instead handles the button click so maybe should be named something else?
    if (newTitle.length > 0) { // validating that new title contains at least 1 character
      var todos = this.get('todos');
      todos.push({
        title: newTitle,
        completed: 0
      });
      this.set('todos', todos); // save to database/cache
      this.save();
    }
  },
  removeTodo: function(id){
    var todos = this.get('todos');
    todos.splice(id - 1, 1);
    this.set('todos', todos);
    this.save();
  },
  editTodo: function(id, newTitle){
    var todos = this.get('todos');
    todos[id - 1].title = newTitle;
    this.set('todos', todos);
    this.save();
  },
  completeTodo: function(id){
    var todos = this.get('todos');
    var current = todos[id - 1].completed;
    todos[id - 1].completed = (current === 0)? 1: 0;
    this.set('todos', todos);
    this.save();
  }
});

module.exports = model;





