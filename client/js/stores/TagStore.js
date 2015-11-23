var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require("react/lib/Object.assign");

var WebAPIUtils = require('../utils/WebAPIUtils');

var CHANGE_EVENT = 'change';

var _tags = {},
    _tagLookup = {},
    _active_tags = {},
    _URLTags = [];

window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

var TagStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  toggleTags: function(tagTextArray){
    tagTextArray.forEach(function(tagText){
      _active_tags[tagText] ? delete _active_tags[tagText] : _active_tags[tagText] = _tagLookup[tagText]
    })
  },

  activateTags: function(tagTextArray){
    tagTextArray.forEach(function(tagText){
      _active_tags[tagText] = _tagLookup[tagText]
    });
  },

  receiveTags: function(tags){
    // Categorize tags by type for UI, 
    // hold onto a lookup of them for future reference.
    tags.forEach(function(tag){
      _tags[tag.type] ? _tags[tag.type].push(tag.text) : _tags[tag.type] = [tag.text]
      _tagLookup[tag.text] = tag
    });

    this.activateTags(_URLTags);
  },

  getTags: function(){
    return _tags
  },

  getActiveTags: function(){
    return _active_tags
  },

  getURLTags: function(){
    return _URLTags
  }

});

TagStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case "URL_CHANGED":
      // var tags = window.location.pathname.split("/").reverse()[0].split("+")
      // FIXME: Looks like only a single tag is supported by MERS filtering
      _URLTags = [window.location.pathname.split("/").reverse()[0]];
      TagStore.emitChange();
      break;

    case "TOGGLE_TAGS":
      TagStore.toggleTags( action.tags );
      TagStore.emitChange();
      break;

    case "ACTIVATE_TAGS":
      TagStore.activateTags( action.tags );
      TagStore.emitChange();
      break;

    case "RECEIVE_TAGS":
      TagStore.receiveTags( action.tags )
      console.debug(_tags)
      console.debug(_active_tags)
      TagStore.emitChange();
      break;

    default:
      // do nothing
  }

});

WebAPIUtils.getTags();
module.exports = TagStore;