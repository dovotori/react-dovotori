/* globals window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class InteractionFloating extends Component {
  constructor(props) {
    super(props);

    this.interact = this.interact.bind(this);
    this.mouseMove = this.mouseMove.bind(this);

    this.coor = { x: 0, y: 0 };
    this.req;
    this.balise;
    this.blur;
    this.cpt = 0;
  }

  componentWillMount() {
    this.req = window.requestAnimationFrame(this.interact);
    window.addEventListener("mousemove", this.mouseMove, false);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.req);
    window.removeEventListener("mousemove", this.mouseMove, false);
  }

  mouseMove(e) {
    this.coor = {
      x: - ((e.clientX / window.innerWidth) - 0.5) * 40,
      y: - ((e.clientY / window.innerHeight) - 0.5) * 40,
    };
  }

  interact() {
    if (this.balise) {
      this.cpt += 1;
      const cos = Math.cos(this.cpt * 0.01);
      const sin = Math.sin(this.cpt * 0.01);
      const x = this.coor.x + (cos * 6);
      const y = this.coor.y + (sin * 6);
      this.balise.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
        + ` translateX(${-x}px) translateY(${-y}px)`
        + ` scale(${ 0.95 + (cos * 0.1)})`;

      // if (this.blur) {
      //   this.blur.firstChild.setAttribute("stdDeviation", ((sin * 0.5) + 0.5) * 4);
      // }
    }
    this.req = window.requestAnimationFrame(this.interact);
  }

  render() {
    return (<div
      ref={div => this.balise = div}
    >
      {this.props.children}
      <svg width="0" height="0">
        <defs>
          <filter id="blur" ref={div => this.blur = div}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
          </filter>
        </defs>
      </svg>
    </div>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  InteractionFloating.propTypes = {
    children: PropTypes.node,
  };
}

InteractionFloating.defaultProps = {
  children: null,
};

export default InteractionFloating;