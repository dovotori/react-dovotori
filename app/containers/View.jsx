import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Logo from '../components/Logo';
import Title from '../components/Title';
import { withMainColumn } from '../components/hoc';

class View extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Logo />
      <Title>View</Title>
    </div>);
  }
}

View.propTypes = {
};

View.defaultProps = {
};

export default compose(
  connect(() => (<View />)),
  withMainColumn,
)(() => (<View />));
