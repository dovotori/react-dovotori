/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EventsWatcher extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.oldScroll = window.pageYOffset;
    this.scrollDirection = '';
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
    window.addEventListener('scroll', this.scroll, false);
  }

  shouldComponentUpdate() {
    return false;
  }

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

  render() {
    return this.props.children;
  }
}

if (process.env.NODE_ENV !== 'production') {
  EventsWatcher.propTypes = {
    children: PropTypes.node,
  };
}

EventsWatcher.defaultProps = {
  children: null,
};

export default EventsWatcher;
