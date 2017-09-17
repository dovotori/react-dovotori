import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { logo } from '../constants/imagesPaths';
import { withColumn } from '../components/withColumn';

class Error extends Component {
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

Error.propTypes = {
};

Error.defaultProps = {
};

export default compose(
  connect(() => (<Error />)),
  withColumn,
)(() => (<Error />));
