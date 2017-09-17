/* global window */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TypingMessage from './TypingMessage';

const Tooltip = styled.div`
  position: absolute;
  top: 200%;
  left: 0;
  width: 100%;

  color: ${p => p.theme.dark};
  overflow: hidden;
  letter-spacing: 0.15em;
  font-weight: 100;
  font-size: 8px;
  text-align: center;
`;

function withTooltip(ComponentToWrap, message) {
  class WithTooltip extends Component {
    constructor(props) {
      super(props);

      this.state = { over: false };
    }

    shouldComponentUpdate(newProps, newState) {
      return newState.over !== this.state.over;
    }

    render() {
      return (<div
        onMouseEnter={() => this.setState({ over: true })}
        onMouseLeave={() => this.setState({ over: false })}
      >
        {this.state.over &&
          (<Tooltip>
            <TypingMessage
              message={message}
              intervalLetter={100}
            />
          </Tooltip>)
        }
        <ComponentToWrap />
      </div>);
    }
  }
  return WithTooltip;
}

export default withTooltip;
