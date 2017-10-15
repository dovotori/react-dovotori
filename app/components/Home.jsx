import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AnimatedBackground from './AnimatedBackground';
import Signature from './Signature';
import withView from './withView';
import { media } from '../themes/theme';


const Styled = styled.div`
`;

const WrapSignature = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  width: 50%;
  max-width: 120px;
  transform: translate3d(0, -50%, 0);

  svg {
    width: 100%;
    height: auto;
  }

  ${media.mobile`
    transform: translate3d(50%, -50%, 0);
  `}
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled>
      <AnimatedBackground />
      <WrapSignature>
        <Signature />
      </WrapSignature>
    </Styled>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  Home.propTypes = {
  };
}

Home.defaultProps = {};

export default withView(Home);
