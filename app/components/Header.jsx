import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from './Nav';
import Logo from './Logo';

class HeaderComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={this.props.className}>
        <Logo />
        <Nav />
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  className: PropTypes.string,
};

HeaderComponent.defaultProps = {
  className: '',
};

const Header = styled(HeaderComponent)`
  position: absolute;
  left: 0;
  top: 50%;
`;

export default Header;
