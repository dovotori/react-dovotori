import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TypingMessage from './TypingMessage';

class WrapperTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { over: false };
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.over !== this.state.over;
  }

  render() {
    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.setState({ over: true })}
        onMouseLeave={() => this.setState({ over: false })}
      >
        {this.props.children}
        {(this.state.over || this.props.disabled) && (
          <TypingMessage
            message={this.props.message}
            intervalLetter={100}
            disabled={this.props.disabled}
          />
        )}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  WrapperTooltip.propTypes = {
    children: PropTypes.node,
    message: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
  };
}

WrapperTooltip.defaultProps = {
  children: null,
  message: '',
  className: '',
  disabled: false,
};

export default WrapperTooltip;
