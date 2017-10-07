import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyledBlink from './StyledBlink';

const Styled = styled.div`
  svg {
    width: 100%;
  }
`;

class Signature extends Component {
  componentWillMount() {
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled>
      <StyledBlink>
        <svg width="186" height="70" version="1.1" viewBox="0 -1 186 70" className="signature" filter="url(#blur)">
          <path className="blink stroke" fill="currentColor" d="m66.1 35.7-1e-6 19.8-25.1-1e-6c-3.97 0-3.97-3.97-3.97-3.97v-15.9s0-3.97 3.97-3.97h21.2c3.97 0 3.97 3.97 3.97 3.97zm-22.5 0c-2.65 0-2.65 2.65-2.65 2.65l1e-6 13.2h18.5c2.65 0 2.65-2.65 2.65-2.65v-13.2z" />
          <path className="blink stroke" fill="currentColor" d="m99.2 3.97v29.1l-27.8 18.5s0 3.97 3.97 3.97l27.8-2e-6v-55.6s-3.97 0-3.97 3.97zm0 34.4v10.6s0 2.65-2.65 2.65h-17.2z" />
          <path className="inverse-blink" d="m184 55.6v-19.8c0-3.97-3.97-3.97-3.97-3.97h-23.8v23.8h3.97v-19.8h19.8v19.8z"/>
          <path className="inverse-blink" d="m130 67.5c0-3.97 3.97-3.97 3.97-3.97h13.2v-7.94h-25.1s-3.97 0-3.97-3.97v-15.9c0-3.97 3.97-3.97 3.97-3.97l29.1-4.9e-5v31.8c0 3.97-3.97 3.97-3.97 3.97zm-7.94-15.9h25.1v-15.9h-22.5c-2.65-.00052-2.65 2.65-2.65 2.65z"/>
          <path className="inverse-blink" d="m75.4 31.8s-3.97 0-3.97 3.97l-1e-6 10.6 27.8 1e-6v2.65s0 2.65-2.65 2.65l-25.1-1e-6s0 3.97 3.97 3.97l23.8 1e-6s3.97 0 3.97-3.97v-5.29s0-3.97-3.97-3.97l-23.8-1e-6v-6.61h11.9s3.97 0 3.97-3.97z"/>
          <path className="inverse-blink" d="m27.8 3.97v29.1l-27.8 18.5s-3e-7 3.97 3.97 3.97l27.8-2e-6v-55.6s-3.97 1.91e-7-3.97 3.97zm0 34.4v10.6s1e-6 2.65-2.65 2.65h-17.2z" />
          <path className="inverse-blink" d="m41 31.8c-3.97 0-3.97 3.97-3.97 3.97v15.9s0 3.97 3.97 3.97h25.1c1e-6-3.97-3.97-3.97-3.97-3.97l-19.8 1e-6 23.8-15.9s0-3.97-3.97-3.97zm17.2 3.97-17.2 11.5v-8.81s-1e-6-2.65 2.65-2.65z" />
          <path className="blink stroke" fill="currentColor" d="m3.97 55.6c-3.97 0-3.97-3.97-3.97-3.97v-17.2s0-2.65 2.65-2.65h17.2c0 3.97-3.97 3.97-3.97 3.97h-9.26c-2.65.0328-2.65 2.65-2.65 2.65v10.6s-.0827 2.66 2.65 2.65h21.2s3.97 0 3.97 3.97z"/>
          <path className="blink stroke" fill="currentColor" d="m112 31.8c-3.97 0-3.97 3.97-3.97 3.97v15.9c0 3.97 3.97 3.97 3.97 3.97l25.1-1e-6c0-3.97-3.97-3.97-3.97-3.97l-19.8 1e-6 23.8-15.9s0-3.97-3.97-3.97zm17.2 3.97-17.2 11.5v-8.81s0-2.65 2.65-2.65z" />
          <path className="inverse-blink" d="m112 55.6s-3.97 0-3.97-3.97v-15.9s0-3.97 3.97-3.97z"/>
        </svg>
      </StyledBlink>
    </Styled>);
  }
}

Signature.propTypes = {
};

Signature.defaultProps = {
};

export default Signature;
