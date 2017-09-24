import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Vec3 from '../geometry/Vec3.js';
import Mat4 from '../geometry/Mat4.js';


class Program extends Component {
  constructor(props) {
    super(props);
    this.program = null;
  }


  componentDidMount() {
    const { vertex, fragment } = this.props;
    const { gl } = this.context;

    this.program = gl.createProgram();

    const vertexData = `
    attribute vec3 Vertice;

    uniform mat4 projection;
    uniform mat4 model;
    uniform mat4 view;

    void main() {
      gl_Position = projection * view * model * vec4(Vertice, 1.0);
    }
    `;
    const fragmentData = `
    precision mediump float;

    void main() {
      gl_FragColor = vec4(102.0 / 255.0, 1.0, 204.0 / 255.0, 1.0);
    }
    `;

    this.creerShader('vertex', vertexData);
    this.creerShader('fragment', fragmentData);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.log("Ne peux pas lier le shader au program");
      gl.deleteProgram(this.program);
      return;
    }
    this.creerLocations();
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
    gl.useProgram(this.program);

    // ATTRIB
    this.program.vLoc = gl.getAttribLocation(this.program, "Vertice");

    // UNIFORM
    this.program.pMatLoc = gl.getUniformLocation(this.program, "projection");
    this.program.mMatLoc = gl.getUniformLocation(this.program, "model");
    this.program.vMatLoc = gl.getUniformLocation(this.program, "view");
  }


  setMatrices() {
    const { projection, model, view } = this.props;

    const { gl } = this.context;
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(this.program.pMatLoc, false, projection);
    gl.uniformMatrix4fv(this.program.mMatLoc, false, model);
    gl.uniformMatrix4fv(this.program.vMatLoc, false, view);
  }


  render() {
    if (this.program) {
      this.setMatrices();
    }
    return Children.map(this.props.children,
      (child) => cloneElement(child, {
        program: this.program,
      })
    );
  }
}

Program.propTypes = {
  children: PropTypes.node,
  vertex: PropTypes.string,
  fragment: PropTypes.string,
  projection: PropTypes.object,
  model: PropTypes.object,
  view: PropTypes.object,
};

Program.defaultProps = {
  children: null,
  vertex: '',
  fragment: '',
  projection: {},
  model: {},
  view: {},
};

Program.contextTypes = {
  gl: PropTypes.object,
};

export default Program;
