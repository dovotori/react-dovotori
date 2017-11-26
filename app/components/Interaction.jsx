/* global document, window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventsWatcher from './EventsWatcher';
import SmoothScroller from './SmoothScroller';
import { easeOutQuad } from '../utils/numbers';

class Interaction extends Component {
  constructor(props) {
    super(props);
    this.state = { targetY: 0 };
    this.scrollBottom = this.scrollBottom.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.pressArrowDown = this.pressArrowDown.bind(this);
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.targetY !== this.state.targetY
      || (newState.targetY === 0 && window.pageYOffset !== 0);
  }

  pressArrowDown(e) {
    switch (e.keyCode) {
      case 40: this.scrollBottom(); break;
      case 38: this.scrollTop(); break;
      default: break;
    }
  }

  scrollBottom() {
    this.setState({ targetY: document.body.scrollHeight - document.body.offsetHeight });
  }

  scrollTop() {
    this.setState({ targetY: 0 });
  }

  render() {
    return (
      <EventsWatcher
        handleKeyup={this.pressArrowDown}
      >
        <SmoothScroller
          easing={easeOutQuad}
          targetY={this.state.targetY}
          duration={300}
        >
          {this.props.children}
        </SmoothScroller>
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

export default Interaction;
