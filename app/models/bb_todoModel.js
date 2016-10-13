// Model handles anything to do with data

import Backbone from 'backbone';
import lscache from 'lscache';

var model = Backbone.Model.extend({
  defaults: {
    todos: []  // data starts as empty array
  },
  fetch: function(){
    var savedTodos = lscache.get('todos');
    if (savedTodos !== null) {  // defensive programming
      this.set('todos', savedTodos); 
    }
  },
  save: function(){
    var todos = this.get('todos');
    lscache.set('todos', todos);
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
  }
});

module.exports = model;
