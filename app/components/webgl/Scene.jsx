/* global windows, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Vec3 from '../geometry/Vec3.js';
import Loop from './Loop';

const Styled = styled.div`
`;

class Scene extends Component {
  getChildContext() {
    return { gl: this.gl };
  }
  constructor(props) {
    super(props);

    this.canvas = document.createElement('canvas');
    this.gl;

    try {
      this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl")     
    } 
    catch(e) {
      console.log(e.error);
    }

    if (this.gl) {
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);                      
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
      </Loop>
      <div id="canvas" />
    </Styled>);
  }
}

Scene.propTypes = {
};

Scene.defaultProps = {
};

Scene.childContextTypes = {
  gl: PropTypes.object,
};

export default Scene;
