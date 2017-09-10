import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Svg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg>
        <use xlinkHref={`#${this.props.useid}`} />
      </svg>
    );
  }
}

Svg.propTypes = {
  useid: PropTypes.string.isRequired,
};

Svg.defaultProps = {};

export default Svg;
