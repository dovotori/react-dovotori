import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const style = css({
  background: '#e6e6e6',
  padding: '4px 20px',
  border: 0,
  borderRadius: 4,
  cursor: 'pointer',
  ':hover': {
    background: '#d4d4d4'
  },
  '@media(max-width: 300px)': {
    display: 'none',
  }
});

class Button extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<button
      {...style}
    >
      {this.props.label}
    </button>);
  }
}

Button.propTypes = {
  label: PropTypes.string,
};

Button.defaultProps = {
  label: '',
};

export default Button;
