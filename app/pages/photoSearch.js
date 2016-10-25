
import Backbone from 'backbone';
import photoSearchModel from '../models/photoSearchModel';

var controller = Backbone.View.extend({
  el: '.photo-search-container',
  events: {
    'keypress .search-input': 'handleKeypress'
  },
  initialize: function(){
    this.render();
  },
  render: function(){
    // ??
  },
  handleKeypress: function(event){
    if (event.which === 13) {
      var currentVal = this.$el.find('.search-input').val();
      if (currentVal !== '') {
        photoSearchModel.fetch(currentVal, this.renderPhotos.bind(this));
      }
    }
  },
  renderPhotos: function(resp){
    var response = resp.responseText; // comes back a string
    // remove first 14 characters of response
    response = response.slice(14, -1);
    var photoData = JSON.parse(response); // normally jquery would parse for us
    var photos = photoData.photos.photo; // got info from console log to see what data object structure was
    var photoHtml = photos.map(function(photo){
      var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
      return '<li><img src="' + url + '" /></li>'; // single quotes to escape double quotes
    });
    this.$el.find('.photo-list').html(photoHtml);
  }
});

module.exports = controller;