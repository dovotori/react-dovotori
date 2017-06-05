import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import Fader from '../components/Fader';
import Title from '../components/Title';

class View extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Fader>
        <Logo />
      </Fader>
      <Title>View</Title>
    </div>);
  }
}

View.propTypes = {
};

View.defaultProps = {
};

export default connect()(View);
