/* global document, window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventsWatcher from './EventsWatcher';
import SmoothScroller from './SmoothScroller';
import { easeOutQuad } from '../utils/numbers';

class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetY: 0,
    };
    this.mousePressed = false;
    this.mousePosition = { x: null, y: null };

    this.scrollBottom = this.scrollBottom.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.pressArrowDown = this.pressArrowDown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
  }

  getChildContext() {
    return {
      mousePosition: this.mousePosition,
      mousePressed: this.mousePressed,
    };
  }

  // shouldComponentUpdate(newProps, newState) {
  //   return newState.targetY !== this.state.targetY;
  // }

  pressArrowDown(e) {
    switch (e.keyCode) {
      case 40:
        this.scrollBottom();
        break;
      case 38:
        this.scrollTop();
        break;
      default:
        break;
    }
  }

  scrollBottom() {
    this.setState({ targetY: document.body.scrollHeight - document.body.offsetHeight });
  }

  scrollTop() {
    this.setState({ targetY: 0 });
  }

  handleMouseup() {
    this.mousePressed = false;
  }

  handleMousedown() {
    this.mousePressed = true;
  }

  handleMousemove(e) {
    this.mousePosition = { x: e.clientX, y: e.clientY };
  }

  render() {
    return (
      <EventsWatcher
        handleKeyup={this.pressArrowDown}
        handleMouseup={this.handleMouseup}
        handleMousedown={this.handleMousedown}
        handleMousemove={this.handleMousemove}
      >
        <SmoothScroller easing={easeOutQuad} targetY={this.state.targetY} duration={300} />
        {this.props.children}
      </EventsWatcher>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Interaction.propTypes = {
    children: PropTypes.node,
  };
}

Interaction.defaultProps = {
  children: null,
};

Interaction.childContextTypes = {
  mousePosition: PropTypes.object,
  mousePressed: PropTypes.bool,
};

export default Interaction;
