// The Model - handles anything to do with data

import lscache from 'lscache';

var database = [];
var model = {  // model has no visual display in an MVC
  init: function(){
    var savedData = lscache.get('todos');
    if (savedData) {
      database = savedData;
    } else {
      database = [];
    }
  },
  save: function(){
    // stringify and parse are opposite - JSON only provides these 2 functions
    var dataToSave = JSON.stringify(database);  
    lscache.set('todos', dataToSave);
  },
  get: function(){
    return database;
  }
};

module.exports = model;