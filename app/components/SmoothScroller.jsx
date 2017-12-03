/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SmoothScroller extends Component {
  constructor(props) {
    super(props);
    this.date = null;
    this.oldY = null;

    this.start = this.start.bind(this);
    this.animation = this.animation.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return newProps.shouldUpdate;
  }

  start() {
    this.date = Date.now();
    this.oldY = window.pageYOffset;
    if (this.oldY !== this.props.targetY) {
      window.requestAnimationFrame(this.animation);
    }
  }

  animation() {
    const { duration, targetY, easing } = this.props;
    const time = Date.now() - this.date;
    if (time < duration) {
      const y = easing(time, this.oldY, targetY - this.oldY, duration);
      window.scrollTo(0, y);
      window.requestAnimationFrame(this.animation);
    } else {
      window.scrollTo(0, targetY);
      if (this.props.callback) {
        this.callback(window.pageYOffset);
      }
    }
  }

  render() {
    this.start();
    return null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  SmoothScroller.propTypes = {
    duration: PropTypes.number,
    targetY: PropTypes.number,
    easing: PropTypes.func.isRequired,
    shouldUpdate: PropTypes.bool,
    callback: PropTypes.func,
  };
}

SmoothScroller.defaultProps = {
  duration: 400,
  targetY: 0,
  callback: null,
  shouldUpdate: false,
};

export default SmoothScroller;
