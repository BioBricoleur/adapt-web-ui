// MapLayerMenuItem.js

var React = require('react');
var ViewActions = require("../actions/ViewActions");

var MapLayerMenuItem = React.createClass({

  onLayerClick: function () {
    var self = this;
    return function (e){
      ViewActions.layerClicked(self.props.layer);
    };
  },

  onLayerMapDisplayClick: function () {
    var self = this;
    return function (e){
      ViewActions.toggleLayerMapDisplay(self.props.layer);
    };
  },

  render: function() {
    var layerName = this.props.layer.text;
    var status = this.props.layer.is_active ? "●" : "○" ;
    var className = "map-menu-layer" + this.props.layer.is_active ? " active" : "";
    return (
      <li className={ className } >
        <span className="map-menu-layer-name" onClick={ this.onLayerClick() }>
        { layerName }
        </span>
        <span className="status-indicator" onClick={ this.onLayerMapDisplayClick() }>{ status }</span>
      </li>
    )
  }

});

module.exports = MapLayerMenuItem;