import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <a>{this.props.label}</a>;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Link.propTypes = {
    label: PropTypes.string,
  };
}

Link.defaultProps = {
  label: '',
};

export default Link;
