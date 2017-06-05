import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Svg from './Svg';

class LogoComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div className={this.props.className}>
      <Svg useid="logo" />
    </div>);
  }
}

LogoComponent.propTypes = {
  className: PropTypes.string,
};

LogoComponent.defaultProps = {
  className: '',
};

const Logo = styled(LogoComponent)`
  & svg {
    display: block;
    margin: 0 auto;
    fill: ${props => props.theme.grey};
    color: ${props => props.theme.primaryColor};
  }
`;

export default Logo;
