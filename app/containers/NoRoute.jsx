import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logo } from '../constants/imagesPaths';

class NoRoute extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <h1>Error</h1>
      <img alt="Logotype dovotori" src={logo} />
    </div>);
  }
}

NoRoute.propTypes = {
};

NoRoute.defaultProps = {
};

export default connect()(NoRoute);
