var React = require('react');

var Loader = require('react-loader');

var About = React.createClass({

  /**
   * State Boilerplate 
   */

  render: function() {


    return (
      <div className="row banner" >
        <h3>About ADAPT Oakland</h3>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum 
          deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
          similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
          cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, 
          omnis voluptas assumenda est, omnis dolor repellendus. 
        </p>
      </div> 
    );
  }
});

module.exports = About;