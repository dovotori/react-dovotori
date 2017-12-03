/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Scene extends Component {
  constructor(props) {
    super(props);
    this.canvas = document.createElement('canvas');
    const { width, height } = this.props;
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
    this.setupGL();
  }

  getChildContext() {
    return { gl: this.gl };
  }

  componentDidMount() {
    document.querySelector('.containerGL').appendChild(this.canvas);
  }

  setupGL() {
    this.gl = null;

    try {
      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    } catch (e) {
      console.log(e.error);
    }

    if (this.gl) {
      this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

      // this.gl.enable(this.gl.DEPTH_TEST);
      // this.gl.depthFunc(this.gl.LEQUAL);

      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      // this.gl.blendEquation( this.gl.FUNC_SUBTRACT );

      // this.gl.enable(this.gl.CULL_FACE);
      // this.gl.cullFace(this.gl.FRONT_AND_BACK);
      // this.gl.cullFace(this.gl.FRONT);

      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const { width, height } = this.props;
    this.gl.viewport(0, 0, width, height);
    return <div className="containerGL">{this.props.children}</div>;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Scene.propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
  };
}

Scene.defaultProps = {
  children: null,
  width: 1024,
  height: 1024,
};

Scene.childContextTypes = {
  gl: PropTypes.object,
};

export default Scene;
