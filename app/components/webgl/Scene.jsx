/* global windows, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Camera from './Camera';
import Objet from './Objet';
import Program from './Program';
import Loop from './Loop';

const Styled = styled.div`
  width: 100%;
  text-align: center;
  canvas {
    margin: 0 auto;
    width: 600px;
    height: 600px;
  }
`;

class Scene extends Component {
  getChildContext() {
    return { gl: this.gl };
  }

  constructor(props) {
    super(props);

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("width", this.props.width);
    this.canvas.setAttribute("height", this.props.height);
    this.gl;

    try {
      this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl")
    }
    catch(e) {
      console.log(e.error);
    }

    if (this.gl) {
      this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }

  componentDidMount() {
    document.querySelector("#canvas").appendChild(this.canvas);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Styled>
      <Loop>
        <Camera
          width={this.props.width}
          height={this.props.height}
        >
          <Program
            vertex="basique"
            fragment="basique"
          >
            <Objet />
          </Program>
        </Camera>
      </Loop>
      <div id="canvas" />
    </Styled>);
  }
}

Scene.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Scene.defaultProps = {
  width: 100,
  height: 100,
};

Scene.childContextTypes = {
  gl: PropTypes.object,
};

export default Scene;
