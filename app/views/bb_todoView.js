// View

import Backbone from 'backbone';
import bbTodoItemView from '../views/bb_todoItemView';

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
    var renderedTodos = todos.map(function(item, index){
      item.id = index + 1;
      // instantiating new todo item view
      var view = new bbTodoItemView(item, controller);
      // returning jquery items
      return view.$el; 
    }); 
    // put all the todo items into the dom
    this.$el.find('.todo-list').html(renderedTodos);
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





