import React, { Component } from "react";
import PropTypes from "prop-types";

class Fbo extends Component {
  constructor(props) {
    super(props);
    this.buffer = null;
    this.texture = null;
    this.filter = null;

    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
  }

  componentWillMount() {
    const { gl } = this.context;
    const { width, height, filter } = this.props;

    switch (filter) {
      default:
      case "LINEAR":
        this.filter = gl.LINEAR;
        break;
      case "NEAREST":
        this.filter = gl.NEAREST;
        break;
      case "LINEAR_MIPMAP_NEAREST":
        this.filter = gl.LINEAR_MIPMAP_NEAREST;
        break;
      case "LINEAR_MIPMAP_LINEAR":
        this.filter = gl.LINEAR_MIPMAP_LINEAR;
        break;
      case "NEAREST_MIPMAP_NEAREST":
        this.filter = gl.NEAREST_MIPMAP_NEAREST;
        break;
      case "NEAREST_MIPMAP_LINEAR":
        this.filter = gl.NEAREST_MIPMAP_LINEAR;
        break;
    }

    // texture vide qui contiendra l'image de l'ecran
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_NEAREST
    );
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);

    this.buffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
    this.buffer.width = width;
    this.buffer.height = height;

    const renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(
      gl.RENDERBUFFER,
      gl.DEPTH_COMPONENT16,
      width,
      height
    );

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.texture,
      0
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      renderbuffer,
      0
    );

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.isLoaded = false;
  }

  componentDidUpdate() {
    this.start();
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

  start() {
    const { gl } = this.context;
    const { width, height } = this.props;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
    gl.viewport(0, 0, width, height);
  }

  end() {
    const { gl } = this.context;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  render() {
    this.end();
    if (this.texture) {
      this.setTexture();
      return this.props.children;
    }
    return null;
  }
}

if (process.env.NODE_ENV !== "production") {
  Fbo.propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    id: PropTypes.number,
    filter: PropTypes.string
  };
}

Fbo.defaultProps = {
  children: null,
  width: 64,
  height: 64,
  id: 0,
  filter: "LINEAR"
};

Fbo.contextTypes = {
  gl: PropTypes.object,
  program: PropTypes.object
};

export default Fbo;
