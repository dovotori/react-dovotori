import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AnimatedBackground from './AnimatedBackground';
import Signature from './Signature';
import withView from './withView';


const Styled = styled.div`
`;

const WrapSignature = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  width: 50%;
  max-width: 200px;

  svg {
    width: 100%;
    height: auto;
  }
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled>
      {<AnimatedBackground />}
      <WrapSignature>
        <Signature />
      </WrapSignature>
    </Styled>);
  }
}

Home.propTypes = {
};

Home.defaultProps = {};

export default withView(Home);
