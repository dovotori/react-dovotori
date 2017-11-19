import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styled = styled.div`

`;

class ButtonBack extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled>
      <Link to="/">
        Back
      </Link>
    </Styled>);
  }
}

export default ButtonBack;