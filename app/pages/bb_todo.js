// Controller is business logic

// import jquery & backbone
// var $ = window.$;
import Backbone from 'backbone';
import bbTodoModel from '../models/bb_todoModel';
import bbTodoItemView from '../views/bb_todoItemView';

var ControllerView = Backbone.View.extend({
  el: '.todo-container', // element
  events: {
    'click .btn-add': 'addTodo',
    'keypress .add-input': 'addKeypress'
  },
  model: new bbTodoModel(), // need to call new to get the model in
  initialize: function(){
    this.model.fetch();  // tells model to get data from lscache
    this.render();
  },
  render: function(){
    // alert('you have ' + this.model.get('todos').length + ' todos!'); // test
    var todos = this.model.get('todos');
    // render each todo item
    var renderedTodos = todos.map(function(item, index){
      item.id = index;
      var view = new bbTodoItemView(item); // instantiating the view
      return view.$el; // returning jquery items
    }); 
    // put all the todo items into the dom
    this.$el.find('.todo-list').html(renderedTodos);
  },
  addTodo: function(){ // adds the todo (don't confuse with function of same name in model)
    var newTitle = this.$el.find('.add-input').val();
    this.model.addTodo(newTitle);
    this.$el.find('.add-input').val('');
    this.render();
  },
  addKeypress: function(event){
    if (event.which === 13) {
      this.addTodo();
    }
  }
});

module.exports = ControllerView;