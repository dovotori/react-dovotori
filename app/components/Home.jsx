import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Canvas from '../components/Canvas';
import withView from '../components/withView';

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Canvas />
    );
  }
}

Home.propTypes = {
};

Home.defaultProps = {};

export default withView(Home);
