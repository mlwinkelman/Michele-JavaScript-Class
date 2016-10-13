// View

import Backbone from 'backbone';
import _ from 'underscore';
import itemTemplate from 'text!./todoItem.tpl'; // text! because it's not javascript; comes from same folder

var todoItemView = Backbone.View.extend({
  // create view that hasn't quite been rendered yet: instead of el, will be an empty div
  tagName: 'div', // makes an el
  events: {},
  initialize: function(item){ // item is the data object
    // compile the template
    this.template = _.template(itemTemplate);
    this.render(item);
  },
  render: function(item){
    this.$el.html(this.template(item)); // jQuery method .html
  }
});

module.exports = todoItemView;
