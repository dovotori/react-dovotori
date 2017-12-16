import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Svg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg className={this.props.className}>
        <use
          href={`#${this.props.useid}`}
          width={this.props.width}
          height={this.props.height}
        />
      </svg>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Svg.propTypes = {
    className: PropTypes.string,
    useid: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  };
}

Svg.defaultProps = {
  className: '',
  width: 20,
  height: 20,
};

export default Svg;
