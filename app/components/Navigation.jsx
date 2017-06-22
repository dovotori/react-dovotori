import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from './/Logo';

class NavigationComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Logo />
    );
  }
}

NavigationComponent.propTypes = {
  className: PropTypes.string,
};

NavigationComponent.defaultProps = {
  className: '',
};

const Navigation = styled(NavigationComponent)`
`;

export default Navigation;
