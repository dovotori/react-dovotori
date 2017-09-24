import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Scene from './webgl/Scene';
import withView from './withView';

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Scene
        width={600}
        height={600}
      />
    );
  }
}

Home.propTypes = {
};

Home.defaultProps = {};

export default withView(Home);
