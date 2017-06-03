import React, { Component } from 'react';

class Svg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg key="svg" className="icon">
        <use xlinkHref="#logo" />
      </svg>
    );
  }
}

Svg.propTypes = {};

Svg.defaultProps = {};

export default Svg;
