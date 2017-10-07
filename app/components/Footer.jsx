import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  // background: ${p => p.theme.gradient};
  background: ${p => p.theme.dark};
  border-top: solid 2px ${p => p.theme.primary};
`;

class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled />);
  }
}

Footer.propTypes = {
};

Footer.defaultProps = {
};

export default Footer;