/* global windows, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Scene extends Component {
  getChildContext() {
    return { gl: this.gl };
  }

  constructor(props) {
    super(props);

    const { width, height } = this.props;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
    this.gl;

    try {
      this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl")
    }
    catch(e) {
      console.log(e.error);
    }

    const { gl } = this;
    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 0.0);

      // gl.enable(gl.DEPTH_TEST);
      // gl.depthFunc(gl.LEQUAL);

      gl.enable( gl.BLEND );
      gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
      // gl.blendEquation( gl.FUNC_SUBTRACT );

      // gl.enable(gl.CULL_FACE);
      // gl.cullFace(gl.FRONT_AND_BACK);
      // gl.cullFace(gl.FRONT);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
  }

  componentDidMount() {
    document.querySelector("#canvas").appendChild(this.canvas);
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (<div>
      {this.props.children}
      <div id="canvas" />
    </div>);
  }
}

Scene.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
};

Scene.defaultProps = {
  children: null,
  width: 100,
  height: 100,
};

Scene.childContextTypes = {
  gl: PropTypes.object,
};

export default Scene;
