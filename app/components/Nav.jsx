import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    );
  }
}

Nav.propTypes = {
};

Nav.defaultProps = {
};

export default Nav;
