import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Svg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg className={this.props.className}>
        <use xlinkHref={`#${this.props.useid}`} />
      </svg>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Svg.propTypes = {
    className: PropTypes.string,
    useid: PropTypes.string.isRequired,
  };
}

Svg.defaultProps = {
  className: '',
};

export default Svg;
