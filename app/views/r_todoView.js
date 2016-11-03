// View

import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import TodoItemView from '../views/r_todoItemView';

var TodoView = Backbone.View.extend({
  el: '.todo-container', // element
  events: {
    'click .btn-add': 'addTodo'//,
    // TODO not working ...
    // 'keypress .add-input': 'addKeypress'
  },
  initialize: function(todos, controller){
    this.controller = controller;
    // pass todos to render function
    this.render(todos);
  },
  render: function(todos){
    // render each todo item
    var controller = this.controller;
    // map always returns an array with same number of items as original
    var todosHtml = todos.map(function(todo, index){
      todo.id = index + 1;
      return <TodoItemView key={index} item={todo} controller={controller} />; // self-closing tag (tag syntax with two passed in properties)
    });

    // React starts with this command
    ReactDOM.render(
      <div>{todosHtml}</div>,
      // find this element - jquery doesn't play nice with react
      this.$el.find('.todo-list')[0] // [0] returns vanilla js object that jquery is finding
    );
  },
  removeHandlers: function(){
    this.$el.find('.btn-add').off();
    this.$el.find('.add-input').off();    
  },
  // adds the todo (don't confuse with function of same name in model)
  addTodo: function(){ 
    var newTitle = this.$el.find('.add-input').val();
    this.$el.find('.add-input').val('');
    this.controller.addTodo(newTitle);
  },
  addKeypress: function(event){
    var newTitle = this.$el.find('.add-input').val();
    this.controller.addKeypress(event, newTitle);
  },
  removeTodo: function(id){
    this.controller.removeTodo(id);
  },
  editTodo: function(id, newTitle){
    this.controller.editTodo(id, newTitle);
  },
  changeComplete: function(id){
    this.controller.changeComplete(id);
  }
});

module.exports = TodoView;





