var React = require('react');
var NavBar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var CollapsibleNav = require('react-bootstrap/lib/CollapsibleNav');
var NavItem = require('react-bootstrap/lib/NavItem');
var NavDropdown = require('react-bootstrap/lib/NavDropdown');
var NavBrand = require('react-bootstrap/lib/NavBrand');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var Link = require('react-router').Link;
var History = require('react-router').History;

var MapStore = require('../stores/MapStore');
var Icon = require('../lib_components/Icon');
var MapGroupMenuItem = require('../components/MapGroupMenuItem');


function displayCase( snakeString ){
  return snakeString.split("_").map(function(w){ return w[0].toUpperCase() + w.slice(1); }).join(" ")
}

var Sidebar = React.createClass({

  mixins: [ History ],

  getMapNav: function(maps){
    var self = this;
    // loo00l .. maps.map(function(map...)) 
    // Such l00l!!111
    var MapPanels = maps.map(function(map, index){
      var GroupPanels = map.groups.map(function(group, index){
        return (
          <MapGroupMenuItem group={group} navigate={self.navigate}></MapGroupMenuItem>
          )
      });

      return(
        <Panel key={index} header={ displayCase(map.text) } eventKey={ index } onClick={ function(e){ self.navigate('/adapt/oakland/' + map.tag.text)} } >
          <div className="map-header"> 
            <h3>section</h3>
            <h3>map layer</h3>
          </div>
          <hr/>
          { GroupPanels }
        </Panel>
      )
    })

    return(
      <div className="second-nav">
        <Accordion>
          { MapPanels }
        </Accordion>
        <div className="responsive-hints">
          <p>Touch the sidebar to show this menu, touch outside the sidebar to hide it.</p>
        </div>
      </div>
    )
  },

  // This function has become hacky - 
  // need to find a better way to have react-router handle navigation.
  // FIXME: This code is also copy/pasted into the text widget
  navigate: function(url, tag){
    if(!url){
      // url = window.location.pathname;
      // ASSERTION: Hardcoded assumption about URLs here - '/adapt/oakland/1_analyze' etc..
      url = window.location.pathname.split("/").slice(0, 4).join("/");
    }
    if(tag){
      url = url.split("#")[0] + "#" + tag;
    }

    // FIXME: For some reason, this is needed 
    // for navigating hashtag URLS w/ react router
    if( url.split("#").length > 1 ){
      setTimeout(function(){
        // window.location.assign(url) 
        window.location = (url) 
      },500)
    }

    this.history.pushState(null, url);
  },

  contact: function(){
    // info@urbanbiofilter.org

    var emailTo = "info@urbanbiofilter.org",
        emailCC = "",
        emailSub = "Adapt Oakland";

    // This option doesn't make a blockable popup, but it does harass the user when it tries to navigate them away from the page
    location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub;
    // window.open("mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody);
  },

  render: function() {

    var loggedIn = this.props.loggedIn;
    var dropdown;

    var navbarClassName;
    var brandClassName;

    var mapNav = this.props.active ? this.getMapNav( this.props.mapTagTree ) : false;

    return (
      <div id="sidebar-wrapper">
        <div className="all-bars">
          <ul className="toolbar-nav">
              <li className="brand">
                <Link to={"/adapt"}>
                  <Icon className="green-fill" symbolID="icon-icon_logo"/>
                </Link>
              </li>
              <li>
                <Link to={ "/adapt/toolbox" }>
                  <Icon className="green-fill" symbolID="icon-icon_toolbox"/>
                </Link>
              </li>
              <li>
                <Link to={ "/adapt/oakland/introduction" }>
                  <Icon className="green-fill" symbolID="icon-icon_map"/>
                </Link>
              </li>
          </ul>
          <ul className="toolbar-nav bottom">
              <li>
                <Link to={ "/adapt/about" }>
                  <Icon className="green-fill" symbolID="icon-icon_about"/>
                </Link>
              </li>
              <li>
                <a onClick={ this.contact }>
                  <Icon className="green-fill" symbolID="icon-icon_share"/>
                </a>
              </li>     
          </ul>
          {mapNav}
        </div>
      </div>
    )
  }

});




module.exports = Sidebar;
