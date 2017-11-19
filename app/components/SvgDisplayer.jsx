import React, { Component } from 'react';

class SvgDisplayer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    /* eslint-disable max-len */
    return (
      <svg style={{ display: 'none' }}>
        <symbol
          width="40"
          height="40"
          viewBox="0 -10 40 60"
          id="logo"
        >
          <path
            className="inverse-blink"
            d="m12 8h-4.8l-7.5 7.5v1.6l7.2 7.2h1.9v-5.9l1.3-1.3v-7.2z"
          />
          <path
            className="inverse-blink"
            d="m6.8 28-4 4 8 8 1.6-1.6v-1.1l3.2-3.2h8l3.2 3.2v1.1l1.6 1.6 8-8-4-4z"
          />
          <path
            className="blink"
            fill="currentColor"
            d="m16 0-1.6 1.6 3.5 3.5-7.2 7.2 3.7 3.7v-4l1.6-1.6 1.9 1.9h3.2l1.9-1.9 1.6 1.6v4l3.7-3.7-7.2-7.2 3.5-3.5-1.6-1.6-3.5 3.5z"
          />
          <path
            className="inverse-blink"
            d="m27 8h4.8l7.5 7.5v1.6l-7.2 7.2h-1.9v-5.9l-1.3-1.3v-7.2z"
          />
        </symbol>
        <symbol width="7" height="10" viewBox="0 0 7 10" id="arrow-previous">
          <path d="M0 5 L5 0 L7 2 L4 5 L7 8 L5 10Z" />
        </symbol>
        <symbol width="7" height="10" viewBox="0 0 7 10" id="arrow-next">
          <path d="M7 5 L2 0 L0 2 L3 5 L0 8 L2 10Z" />
        </symbol>
        <symbol width="15" height="10" viewBox="0 0 14 10" id="arrow-back">
          <path d="M0 5 L5 0 L7 2 L4 5 L7 8 L5 10Z" />
          <path d="M7 5 L12 0 L14 2 L11 5 L14 8 L12 10Z" />
        </symbol>
      </svg>
    );
    /* eslint-enable max-len */
  }
}

SvgDisplayer.propTypes = {};

SvgDisplayer.defaultProps = {};

export default SvgDisplayer;
