/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Routes from './Routes';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import Signature from './Signature';
import SvgDisplayer from './SvgDisplayer';
import EventsWatcher from './EventsWatcher';
import SmoothScroller from './SmoothScroller';
import { easeOutQuad } from '../utils/numbers';

class Structure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePressed: false,
      mousePosition: { x: null, y: null },
      targetY: -1,
    };

    this.scrollBottom = this.scrollBottom.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.pressArrowDown = this.pressArrowDown.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.resetScrolling = this.resetScrolling.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return this.props.location.pathname !== newProps.location.pathname;
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

  handleMouseup() {
    this.setState({ mousePressed: false });
  }

  handleMousedown() {
    this.setState({ mousePressed: true });
  }

  handleMousemove(e) {
    this.setState({ mousePosition: { x: e.clientX, y: e.clientY } });
  }

  resetScrolling() {
    this.setState({ targetY: -1 });
  }

  render() {
    return (
      <EventsWatcher
        handleKeyup={this.pressArrowDown}
        handleMouseup={this.handleMouseup}
        handleMousedown={this.handleMousedown}
        handleMousemove={this.handleMousemove}
      >
        <SmoothScroller
          shouldUpdate={this.props.location.pathname !== '/'}
          easing={easeOutQuad}
          targetY={document.body.scrollHeight - document.body.offsetHeight}
          duration={300}
        />
        <SvgDisplayer />
        <Route path={'/:slug*'} component={Header} />
        <Signature />
        <AnimatedBackground />
        <Route path={'/:slug*'} component={Routes} />
        <Footer />
      </EventsWatcher>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Structure.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };
}

Structure.defaultProps = {};

export default Structure;
