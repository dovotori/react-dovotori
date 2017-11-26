import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Objet extends Component {
  constructor(props) {
    super(props);

    this.nbPoints = 0;
    this.modeDessin;
    this.modeCalcul;

    this.vbo = new Array(5);

    for (let i = 0; i < 5; i += 1) {
      this.vbo[i] = null;
    }
  }

  componentWillMount() {
    const { gl } = this.context;
    const { mode } = this.props;

    this.modeCalcul = gl.STATIC_DRAW;
    // gl.STATIC_DRAW // change pas
    // gl.DYNAMIC_DRAW // repete
    // gl.STREAM_DRAW // une fois au moins

    switch (mode) {
      case 'TRIANGLES':
      default:
        this.modeDessin = gl.TRIANGLES;
        break;
      case 'LINES':
        this.modeDessin = gl.LINES;
        break;
      case 'POINTS':
        this.modeDessin = gl.POINTS;
        break;
      case 'LINE_STRIP':
        this.modeDessin = gl.LINE_STRIP;
        break;
      case 'LINE_LOOP':
        this.modeDessin = gl.LINE_LOOP;
        break;
    }

    this.applyIndex();
  }

  setModelMatrice(gl, program, model) {
    gl.uniformMatrix4fv(program.mMatLoc, false, model);
  }

  drawFaceByFace(gl) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vbo[0]);
    for (let i = 0; i < this.nbPoints; i += 4) {
      gl.drawElements(this.modeDessin, 4, gl.UNSIGNED_SHORT, i * 2);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  drawIndex(gl) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vbo[0]);
    gl.drawElements(this.modeDessin, this.nbPoints, gl.UNSIGNED_SHORT, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  setColor(gl, program, color) {
    gl.uniform4f(program.cVecLoc, color[0], color[1], color[2], color[3]);
  }

  applyIndex() {
    const { indices } = this.props;
    const { gl } = this.context;
    this.nbPoints = indices.length;

    // INDICES
    this.vbo[0] = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vbo[0]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.modeCalcul);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  render() {
    const { model, color } = this.props;
    const { gl, program } = this.context;

    if (model) {
      this.setModelMatrice(gl, program, model);
    }
    if (color) {
      this.setColor(gl, program, color);
    }
    // this.drawIndex(gl, program);
    this.drawFaceByFace(gl, program);

    return null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Objet.propTypes = {
    modeCalcul: PropTypes.number,
    model: PropTypes.object,
    mode: PropTypes.string,
    indices: PropTypes.array,
    color: PropTypes.array,
  };
}

Objet.defaultProps = {
  modeCalcul: 0,
  model: null,
  mode: 'TRIANGLES',
  indices: [],
  color: null,
};

Objet.contextTypes = {
  gl: PropTypes.object,
  program: PropTypes.object,
};

export default Objet;
