/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resizewatcher extends Component {
  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, false);
  }

  resize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  render() {
    return this.props.children;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Resizewatcher.propTypes = {
    children: PropTypes.node,
  };
}

Resizewatcher.defaultProps = {
  children: null,
};

export default Resizewatcher;
