import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
`;

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas;
  }

  componentDidMount() {
    this.setState({ scale: true });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled>
      <canvas innerRef={d => this.canvas = d}/>
    </Styled>);
  }
}

Canvas.propTypes = {
};

Canvas.defaultProps = {
};

export default Canvas;
