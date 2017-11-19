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
    return newProps.targetY !== this.props.targetY;
  }

  start() {
    this.date = Date.now();
    this.oldY = window.pageYOffset;
    window.requestAnimationFrame(this.animation);
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
    }
  }

  render() {
    if (!this.props.disabled) { this.start(); }
    return this.props.children;
  }
}

if (process.env.NODE_ENV !== 'production') {
  SmoothScroller.propTypes = {
    children: PropTypes.node,
    duration: PropTypes.number,
    targetY: PropTypes.number,
    easing: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
}

SmoothScroller.defaultProps = {
  children: null,
  duration: 400,
  targetY: 0,
  disabled: false,
};

export default SmoothScroller;
