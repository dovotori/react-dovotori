import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { css } from 'glamor';

import { primaryColor } from '../constants/styleVariables';

const style = css({
  fill: '#333333',
  color: primaryColor,
});

class Svg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<svg className="icon" >
      <use {...style} xlinkHref="#logo" />
    </svg>);
  }
}

Svg.propTypes = {};

Svg.defaultProps = {};

export default Svg;
