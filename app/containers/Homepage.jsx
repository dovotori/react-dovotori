import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../components/Button';
import Svg from '../components/Svg';
import Fader from '../components/Fader';
import { logo } from '../constants/imagesPaths';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.theme.primaryColor};
`;

class Homepage extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (<div>
      <Fader>
        <Svg />
      </Fader>
      <Button label="btn 1" />
      <Title>Welcome</Title>
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
