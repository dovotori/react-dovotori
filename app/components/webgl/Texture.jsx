import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Texture extends Component {
  constructor(props) {
    super(props);

    this.texture = null;
    this.filter;
  }


  componentWillMount() {
    const { gl } = this.context;
    const { mode } = this.props;

    this.filter =
      gl.NEAREST;
      // gl.LINEAR;

    this.texture = gl.createTexture();

    // this.texture.image = new Image();
    // this.texture.image.addEventListener("load", this.apply.bind(this), false);
    // this.texture.image.src = chemin;
    switch (mode) {
      case 'NOISE': default: this.setupNoiseRVB(); break;
      case 'GRADIENT': this.setupGradient(); break;
    }
  }


  apply() {
    const { gl } = this.context;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
    // FILTRE
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filter);
    // REPETITION
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // uv > 1 il repete 1
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT); // uv > 1 il repete la texture
    // MIPMAP
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); // gl.LINEAR_MIPMAP_NEAREST
    //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_LOD_BIAS, -0.4); // niveau de detail
    gl.bindTexture(gl.TEXTURE_2D, null);
  }


  setupNoiseRVB() {
    const { gl } = this.context;
    const { width, height } = this.props;

    let b = new ArrayBuffer(width * height * 4);
    const pixel = new Uint8Array(b);
    let cptRVBA = 0;

    for (let y = 0; y < height; y+= 1) {
      for (let x = 0; x < width; x+= 1) {
        pixel[cptRVBA] = Math.random() * 255;
        pixel[cptRVBA+1] = Math.random() * 255;
        pixel[cptRVBA+2] = Math.random() * 255;
        pixel[cptRVBA+3] = 255;
        cptRVBA += 4;
      }
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }


  setupGradient() {
    const { gl } = this.context;
    const { width, height } = this.props;

    let b = new ArrayBuffer(width * height * 4);
    const pixel = new Uint8Array(b);
    let cptRVBA = 0;

    for (let y = 0; y < height; y+= 1) {
      for (let x = 0; x < width; x+= 1) {
        pixel[cptRVBA] = y%255;
        pixel[cptRVBA+1] = x%255;
        pixel[cptRVBA+2] = x%255;
        pixel[cptRVBA+3] = 255;
        cptRVBA += 4;
      }
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }


  setupNoise(taille) {
    const { gl } = this.context;
    const { width, height } = this.props;

    let b = new ArrayBuffer(width * height);
    let pixel = new Uint8Array(b);
    let cpt = 0;

    for (let y = 0; y < height; y+= 1) {
      for (let x = 0; x < width; x+= 1) {
        pixel[cpt] = random(0, 255);
        cpt+= 1;
      }
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, width, height, 0, gl.ALPHA, gl.UNSIGNED_BYTE, pixel);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }


  setTexture() {
    const { gl, program } = this.context;
    const { id } = this.props;

    let tex;
    let location;
    switch (id) {
      case 0: default: tex = gl.TEXTURE0; location = program.tex0Loc; break;
      case 1: tex = gl.TEXTURE1; location = program.tex1Loc; break;
      case 2: tex = gl.TEXTURE2; location = program.tex2Loc; break;
      case 3: tex = gl.TEXTURE3; location = program.tex3Loc; break;
      case 4: tex = gl.TEXTURE4; location = program.tex4Loc; break;
      case 5: tex = gl.TEXTURE5; location = program.tex5Loc; break;
    }

    gl.activeTexture(tex);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(location, id);
  }


  render() {
    this.setTexture();
    return this.props.children;
  }
}


Texture.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.number,
  mode: PropTypes.string,
};

Texture.defaultProps = {
  children: null,
  width: 64,
  height: 64,
  id: 0,
  mode: 'NOISE',
};

Texture.contextTypes = {
  gl: PropTypes.object,
  program: PropTypes.object,
};

export default Texture;
