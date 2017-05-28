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
    background: '#d4d4d4',
  },
  '@media(max-width: 300px)': {
    display: 'none',
  },
});

class Link extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<a
      {...style}
    >
      {this.props.label}
    </a>);
  }
}

Link.propTypes = {
  label: PropTypes.string,
};

Link.defaultProps = {
  label: '',
};

export default Link;
