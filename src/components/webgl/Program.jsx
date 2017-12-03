import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Vec3 from '../geometry/Vec3.js';
import Mat4 from '../geometry/Mat4.js';

class Program extends Component {
  getChildContext() {
    return { program: this.program };
  }

  constructor(props) {
    super(props);
    this.program = null;
  }

  componentWillMount() {
    const { vertex, fragment } = this.props;
    const { gl } = this.context;

    this.program = gl.createProgram();

    this.creerShader('vertex', vertex);
    this.creerShader('fragment', fragment);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.log('Ne peux pas lier le shader au program');
      gl.deleteProgram(this.program);
      return;
    }
    this.creerLocations();
  }

  componentWillUpdate() {
    const { gl } = this.context;
    gl.useProgram(null);
  }

  creerShader(type, source) {
    const { gl } = this.context;
    const s = gl.createShader(type === 'vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    gl.shaderSource(s, source);
    gl.compileShader(s);

    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.log(`Ne peux pas compiler le ${type} shader:\n${gl.getShaderInfoLog(s)}`);
      gl.deleteShader(s);
      return;
    }

    gl.attachShader(this.program, s);
    gl.deleteShader(s);
  }

  creerLocations() {
    const { gl } = this.context;
    const { projection, view } = this.props;

    gl.useProgram(this.program);

    // ATTRIB
    this.program.vLoc = gl.getAttribLocation(this.program, 'Vertice');

    // UNIFORM
    this.program.pMatLoc = gl.getUniformLocation(this.program, 'projection');
    this.program.mMatLoc = gl.getUniformLocation(this.program, 'model');
    this.program.vMatLoc = gl.getUniformLocation(this.program, 'view');

    this.program.cVecLoc = gl.getUniformLocation(this.program, 'color');

    this.program.tex0Loc = gl.getUniformLocation(this.program, 'tex0');
    this.program.tex1Loc = gl.getUniformLocation(this.program, 'tex1');
    this.program.tex2Loc = gl.getUniformLocation(this.program, 'tex2');
    this.program.tex3Loc = gl.getUniformLocation(this.program, 'tex3');
    this.program.tex4Loc = gl.getUniformLocation(this.program, 'tex4');
    this.program.tex5Loc = gl.getUniformLocation(this.program, 'tex5');

    this.program.timeLoc = gl.getUniformLocation(this.program, 'time');
    this.program.amplitudeLoc = gl.getUniformLocation(this.program, 'amplitude');
  }

  setMatrices(gl) {
    const { projection, view } = this.props;
    if (projection || view) {
      gl.uniformMatrix4fv(this.program.pMatLoc, false, projection);
      gl.uniformMatrix4fv(this.program.vMatLoc, false, view);
    }
  }

  setTime(gl) {
    const { time } = this.props;
    if (time !== null) {
      gl.uniform1f(this.program.timeLoc, time);
    }
  }

  setAmplitude(gl) {
    const { amplitude } = this.props;
    if (amplitude !== null) {
      gl.uniform1f(this.program.amplitudeLoc, amplitude);
    }
  }

  render() {
    const { gl } = this.context;

    if (this.program) {
      gl.useProgram(this.program);
      this.setMatrices(gl);
      this.setTime(gl);
      this.setAmplitude(gl);

      return this.props.children;
    }
    return null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Program.propTypes = {
    children: PropTypes.node,
    vertex: PropTypes.string,
    fragment: PropTypes.string,
    projection: PropTypes.object,
    view: PropTypes.object,
    time: PropTypes.number,
    amplitude: PropTypes.number,
  };
}

Program.defaultProps = {
  children: null,
  vertex: '',
  fragment: '',
  projection: null,
  view: null,
  time: null,
  amplitude: null,
};

Program.contextTypes = {
  gl: PropTypes.object,
};

Program.childContextTypes = {
  program: PropTypes.object,
};

export default Program;
