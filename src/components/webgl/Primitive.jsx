import React, { Component } from "react";
import PropTypes from "prop-types";

import Mat4 from "../geometry/Mat4";

class Primitive extends Component {
  constructor(props) {
    super(props);

    this.nbPoints = 0;
    this.modeDessin = null;
    this.modeCalcul = null;
    this.vbo = new Array(5);

    for (let i = 0; i < 5; i += 1) {
      this.vbo[i] = null;
    }
  }

  componentWillMount() {
    const { gl } = this.context;
    const { mode, type } = this.props;

    switch (mode) {
      case "TRIANGLES":
      default:
        this.modeDessin = gl.TRIANGLES;
        break;
      case "LINES":
        this.modeDessin = gl.LINES;
        break;
      case "POINTS":
        this.modeDessin = gl.POINTS;
        break;
      case "LINE_STRIP":
        this.modeDessin = gl.LINE_STRIP;
        break;
      case "LINE_LOOP":
        this.modeDessin = gl.LINE_LOOP;
        break;
    }

    this.modeCalcul = gl.STATIC_DRAW;
    // gl.STATIC_DRAW // change pas
    // gl.DYNAMIC_DRAW // repete
    // gl.STREAM_DRAW // une fois au moins

    switch (type) {
      case "PLANE":
      default:
        this.setupPlane();
        break;
      case "CUBE":
        this.setupCube();
        break;
    }
  }

  setupPlane() {
    const points = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0, -1, 1, 0];
    this.setup(points);
  }

  setupCube() {
    const points = [
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0
    ];
    this.setup(points);
  }

  setup(points) {
    const { gl } = this.context;
    this.vbo[0] = gl.createBuffer();
    this.nbPoints = 0;
    if (points != null) {
      this.updateBuffer(points);
    }
  }

  updateBuffer(points) {
    const { gl } = this.context;
    this.nbPoints = points.length / 3;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), this.modeCalcul);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  setModelMatrice(gl, program) {
    const { model } = this.props;
    gl.uniformMatrix4fv(program.mMatLoc, false, model);
  }

  draw(gl, program) {
    if (program.vLoc > -1) {
      gl.enableVertexAttribArray(program.vLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
      gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
    }

    gl.drawArrays(this.modeDessin, 0, this.nbPoints);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  setColor(gl, program, color) {
    gl.uniform4f(program.cVecLoc, color[0], color[1], color[2], color[3]);
  }

  render() {
    const { gl, program } = this.context;
    const { color } = this.props;

    if (program) {
      this.setModelMatrice(gl, program);
      if (color) {
        this.setColor(gl, program, color);
      }
      this.draw(gl, program);
    }
    return null;
  }
}

if (process.env.NODE_ENV !== "production") {
  Primitive.propTypes = {
    model: PropTypes.object,
    mode: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.array
  };
}

Primitive.defaultProps = {
  model: new Mat4().get(),
  mode: "TRIANGLES",
  type: "PLANE",
  color: null
};

Primitive.contextTypes = {
  gl: PropTypes.object,
  program: PropTypes.object
};

export default Primitive;
