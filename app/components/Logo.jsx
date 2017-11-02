import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import StyledBlink from './StyledBlink';

class Logo extends Component {
  componentWillMount() {}

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 -10 40 60"
        className={this.props.className}
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
      </svg>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Logo.propTypes = {
    className: PropTypes.string,
  };
}

Logo.defaultProps = {
  className: '',
};

export default Logo;
