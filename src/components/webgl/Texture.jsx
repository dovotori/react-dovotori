import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Texture extends Component {
  constructor(props) {
    super(props);

    this.texture = null;
    this.filter = null;
    this.filterMag = null;
  }

  componentWillMount() {
    const { mode } = this.props;

    switch (mode) {
      case 'NOISE':
      default:
        this.setupNoiseRVB();
        break;
      case 'GRADIENT':
        this.setupGradient();
        break;
    }
  }

  setupNoiseRVB() {
    const { gl } = this.context;
    const { width, height } = this.props;

    const b = new ArrayBuffer(width * height * 4);
    const pixel = new Uint8Array(b);
    let cptRVBA = 0;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel[cptRVBA] = Math.random() * 255;
        pixel[cptRVBA + 1] = Math.random() * 255;
        pixel[cptRVBA + 2] = Math.random() * 255;
        pixel[cptRVBA + 3] = 255;
        cptRVBA += 4;
      }
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    this.setOptions();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  setupGradient() {
    const { gl } = this.context;
    const { width, height } = this.props;

    const b = new ArrayBuffer(width * height * 4);
    const pixel = new Uint8Array(b);
    let cptRVBA = 0;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel[cptRVBA] = y % 255;
        pixel[cptRVBA + 1] = x % 255;
        pixel[cptRVBA + 2] = x % 255;
        pixel[cptRVBA + 3] = 255;
        cptRVBA += 4;
      }
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    this.setOptions();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  setupNoise() {
    const { gl } = this.context;
    const { width, height } = this.props;

    const b = new ArrayBuffer(width * height);
    const pixel = new Uint8Array(b);
    let cpt = 0;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        pixel[cpt] = Math.random() * 255;
        cpt += 1;
      }
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, width, height, 0, gl.ALPHA, gl.UNSIGNED_BYTE, pixel);
    this.setOptions();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  setOptions() {
    const { gl } = this.context;
    const { filter, filterMag } = this.props;

    switch (filter) {
      default:
      case 'LINEAR':
        this.filter = gl.LINEAR;
        break;
      case 'NEAREST':
        this.filter = gl.NEAREST;
        break;
      case 'LINEAR_MIPMAP_NEAREST':
        this.filter = gl.LINEAR_MIPMAP_NEAREST;
        break;
      case 'LINEAR_MIPMAP_LINEAR':
        this.filter = gl.LINEAR_MIPMAP_LINEAR;
        break;
      case 'NEAREST_MIPMAP_NEAREST':
        this.filter = gl.NEAREST_MIPMAP_NEAREST;
        break;
      case 'NEAREST_MIPMAP_LINEAR':
        this.filter = gl.NEAREST_MIPMAP_LINEAR;
        break;
    }

    switch (filterMag) {
      default:
      case 'LINEAR':
        this.filterMag = gl.LINEAR;
        break;
      case 'NEAREST':
        this.filterMag = gl.NEAREST;
        break;
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMag);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  setTexture() {
    const { gl, program } = this.context;
    const { id } = this.props;

    let tex;
    let location;
    switch (id) {
      case 0:
      default:
        tex = gl.TEXTURE0;
        location = program.tex0Loc;
        break;
      case 1:
        tex = gl.TEXTURE1;
        location = program.tex1Loc;
        break;
      case 2:
        tex = gl.TEXTURE2;
        location = program.tex2Loc;
        break;
      case 3:
        tex = gl.TEXTURE3;
        location = program.tex3Loc;
        break;
      case 4:
        tex = gl.TEXTURE4;
        location = program.tex4Loc;
        break;
      case 5:
        tex = gl.TEXTURE5;
        location = program.tex5Loc;
        break;
    }

    gl.activeTexture(tex);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(location, id);
  }

  render() {
    if (this.texture) {
      // this.setTexture();
      return this.props.children;
    }
    return null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Texture.propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    id: PropTypes.number,
    mode: PropTypes.string,
    filter: PropTypes.string,
    filterMag: PropTypes.string,
  };
}

Texture.defaultProps = {
  children: null,
  width: 1024,
  height: 1024,
  id: 0,
  mode: 'NOISE',
  filter: 'LINEAR',
  filterMag: 'NEAREST',
};

Texture.contextTypes = {
  gl: PropTypes.object,
  program: PropTypes.object,
};

export default Texture;
