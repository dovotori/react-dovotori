import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import Button from '../components/Button';
import Svg from '../components/Svg';
import { logo } from '../constants/imagesPaths';

const style = css({
});

class Homepage extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div {...style}>
      <Svg />
      <Button label="btn 1" />
      <h1>Welcome</h1>
      <Button label="btn 2" />
      <img alt="Logotype dovotori" src={logo} />
    </div>);
  }
}

Homepage.propTypes = {
};

Homepage.defaultProps = {
};

export default connect()(Homepage);
