/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WatcherEvents extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.keyup = this.keyup.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.oldScroll = window.pageYOffset;
    this.scrollDirection = '';
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
    window.addEventListener('scroll', this.scroll, false);
    window.addEventListener('keyup', this.keyup, false);
    window.addEventListener('mouseup', this.mouseup, false);
    window.addEventListener('mousedown', this.mousedown, false);
    window.addEventListener('mousemove', this.mousemove, false);
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

  scroll() {
    if (window.pageYOffset > this.oldScroll) {
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }
    this.oldScroll = window.pageYOffset;
  }

  keyup(e) {
    if (this.props.handleKeyup) {
      this.props.handleKeyup(e);
    }
  }

  mouseup(e) {
    if (this.props.handleMouseup) {
      this.props.handleMouseup(e);
    }
  }

  mousedown(e) {
    if (this.props.handleMousedown) {
      this.props.handleMousedown(e);
    }
  }

  mousemove(e) {
    if (this.props.handleMousemove) {
      this.props.handleMousemove(e);
    }
  }

  render() {
    return this.props.children;
  }
}

if (process.env.NODE_ENV !== 'production') {
  WatcherEvents.propTypes = {
    children: PropTypes.node,
    handleKeyup: PropTypes.func,
    handleMouseup: PropTypes.func,
    handleMousedown: PropTypes.func,
    handleMousemove: PropTypes.func,
  };
}

WatcherEvents.defaultProps = {
  children: null,
  handleKeyup: null,
  handleMouseup: null,
  handleMousedown: null,
  handleMousemove: null,
};

export default WatcherEvents;
