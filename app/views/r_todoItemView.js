// // The View, or user interface,  if it pertains to one particular item

import React from 'react';

var ItemView = React.createClass({
  getInitialState: function(){
    return { editing: false };
  },
  // what components will it receive
  propTypes: {
    item: React.PropTypes.object.isRequired,
    controller: React.PropTypes.object.isRequired
  },
  render: function(){
    var baseClasses = 'todo';
    if (this.props.item.completed) {
      baseClasses += ' completed';
    }
    return (
      <div className={baseClasses}>
        <div className="col-sm-1">{this.props.item.id}</div>
        { this.state.editing !== true && 
          <div className="col-sm-7 todo-title">{this.props.item.title}</div>
        }
        { this.state.editing === true && 
          <div className="col-sm-7 todo-title-edit">
          <input className="title-edit-input" type="text" defaultValue={this.props.item.title} />
        </div>
        }
        <div className="col-sm-1">
        { this.props.item.completed === 1 && // evaluates as an if statement
          <input type="checkbox" checked onChange={this.toggleCheckbox} />
        }
        { this.props.item.completed === 0 &&
          <input type="checkbox" onChange={this.toggleCheckbox} />
        }
        </div>
        <div className="col-sm-2">
        {this.state.editing !== true &&
          <button className="btn btn-default edit" onClick={this.editTodo}>Edit</button>
        }
        {this.state.editing === true &&
          <button className="btn btn-primary save" onClick={this.saveTodo}>Save</button>
        } 
        </div>
        <div className="col-sm-1">
          <button type="button" className="close" aria-label="Close" onClick={this.removeTodo} >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>  
    );
  },
  toggleCheckbox: function(){
    this.props.controller.changeComplete(this.props.item.id);
  },
  removeTodo: function(){
    this.props.controller.removeTodo(this.props.item.id);
  },
  editTodo: function(){
    this.setState({ editing: true });
  },
  saveTodo: function(){
    var newTitle = document.querySelector('.title-edit-input').value;
    this.setState({ editing: false });
    this.props.controller.editTodo(this.props.item.id, newTitle);
  }
});

module.exports = ItemView;

// import Backbone from 'backbone';
// import _ from 'underscore';
// import itemTemplate from 'text!./todoItem.tpl'; // text! because it's not javascript; comes from same folder so only one dot

// var todoItemView = Backbone.View.extend({
//   // create view that hasn't quite been rendered yet: instead of el, will be an empty div
//   tagName: 'div', // makes an el
//   events: {
//     'click .close': 'removeHandler',
//     'click .edit': 'editHandler',
//     'click .save': 'saveHandler',
//     'change input[type="checkbox"]': 'checkboxHandler',
//     'keypress .todo-title-edit-update': 'saveKeypress'
//   },
//   initialize: function(item, controller){ // item is the data object
//     this.id = item.id;
//     this.controller = controller;
//     // compile the template
//     this.template = _.template(itemTemplate);
//     this.render(item);
//   },
//   render: function(item){
//     this.$el.html(this.template(item)); // jQuery method .html
//   },
//   removeHandler: function(){
//     this.controller.removeTodo(this.id);
//   },
//   editHandler: function(){
//     // go into edit mode
//     this.$el.find('.edit').addClass('hidden');
//     this.$el.find('.save').removeClass('hidden'); // unhides the save button
//     this.$el.find('.todo-title').addClass('hidden');
//     this.$el.find('.todo-title-edit').removeClass('hidden');
//   },
//   saveHandler: function(){
//     var newTitle = this.$el.find('.todo-title-edit input').val();
//     this.controller.editTodo(this.id, newTitle);
//   },
//   checkboxHandler: function(){
//     this.controller.changeComplete(this.id);
//   },
//   saveKeypress: function(event){
//     if (event.which === 13) {
//       this.saveHandler();
//     }
//   }
// });

// module.exports = todoItemView;
