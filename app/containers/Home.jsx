import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Fader from '../components/Fader';
import Title from '../components/Title';
import { logo } from '../constants/imagesPaths';

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Fader>
        <Logo />
      </Fader>
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

export default connect()(Home);
