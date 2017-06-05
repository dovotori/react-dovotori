import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Title from '../components/Title';
import { logo } from '../constants/imagesPaths';
import { withMainColumn } from '../components/hoc';

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Logo />
      <Button label="btn 1" />
      <Title>Welcome</Title>
      <Button label="btn 2" />
      <img alt="Logotype dovotori" src={logo} />
    </div>);
  }
}

Home.propTypes = {
};

Home.defaultProps = {
};

export default compose(
  connect(() => (<Home />)),
  withMainColumn,
)(() => (<Home />));
