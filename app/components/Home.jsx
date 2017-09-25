import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AnimatedBackground from './AnimatedBackground';
import withView from './withView';


const Styled = styled.div`
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<AnimatedBackground />);
  }
}

Home.propTypes = {
};

Home.defaultProps = {};

export default withView(Home);
