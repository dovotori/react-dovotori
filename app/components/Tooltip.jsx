import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TypingMessage from './TypingMessage';

const Styled = styled.div`
  position: absolute;
  top: 200%;
  left: 0;
  width: 100%;
`;

class Tooltip extends Component {
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
        (<Styled>
          <TypingMessage
            message={this.props.message}
            intervalLetter={100}
          />
        </Styled>)
      }
      {this.props.children}
    </div>);
  }
}


if (process.env.NODE_ENV !== 'production') {
  Tooltip.propTypes = {
    children: PropTypes.node,
    message: PropTypes.string,
  };
}

Tooltip.defaultProps = {
  children: null,
  message: '',
};


export default Tooltip;
