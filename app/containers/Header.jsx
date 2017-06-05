import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/view">View</Link>
        <Link to="/fsgr">Error</Link>
      </div>
    );
  }
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
