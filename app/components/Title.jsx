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

class Title extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<h1
      {...style}
    >
      {this.props.label}
    </h1>);
  }
}

Title.propTypes = {
  label: PropTypes.string,
};

Title.defaultProps = {
  label: '',
};

export default Title;
