import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keyframes, withTheme } from 'styled-components';

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
    fill: rgba(0,0,0,0);
  }
`;

class SvgAnimation extends Component {
  constructor(props) {
    super(props);
    this.animEnd = this.animEnd.bind(this);
    this.start = this.start.bind(this);

    this.div;
    this.paths;
    this.lengths;
    this.isAnimated = false;
  }

  componentDidMount() {
    this.paths = this.div.getElementsByTagName('path');
    this.lengths = [];
    this.start();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.toggleAnim !== this.props.toggleAnim && !this.isAnimated) {
      this.start();
    }
  }

  // shouldComponentUpdate(newProps) {
  //   return this.props.toggleAnim !== newProps.toggleAnim;
  // }

  start() {
    const { theme } = this.props;
    this.isAnimated = true;
    Array.prototype.forEach.call(this.paths, (path, idx) => {
      this.lengths[idx] = path.getTotalLength();

      path.style.strokeDasharray = this.lengths[idx];
      path.style.strokeDashoffset = this.lengths[idx];
      path.style.animation = `${dash} 1s ease-out alternate 2`;
      path.style.stroke = theme.primary;
      // if (path.getAttribute('class').indexOf('-blink') !== -1) {
      //   path.style.stroke = '#fff';
      // } else {
      // path.style.stroke = theme.primary;
      // }
      if (idx === 0) {
        path.addEventListener('animationend', this.animEnd, false);
      }
    });
  }

  animEnd(e) {
    Array.prototype.forEach.call(this.paths, (path, idx) => {
      path.style.stroke = 'none';
      path.style.animation = 'none';
      if (idx === 0) {
        path.removeEventListener('animationend', this.animEnd, false);
      }
    });
    this.isAnimated = false;
  }

  render() {
    return <div ref={d => (this.div = d)}>{this.props.children}</div>;
  }
}

if (process.env.NODE_ENV !== 'production') {
  SvgAnimation.propTypes = {
    children: PropTypes.node,
    toggleAnim: PropTypes.bool,
  };
}

SvgAnimation.defaultProps = {
  children: null,
  toggleAnim: false,
};

export default withTheme(SvgAnimation);
