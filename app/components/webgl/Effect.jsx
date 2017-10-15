import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Effect extends Component {
  constructor(props) {
    super(props);
    this.ppb = new PingPongBuffer();
    this.screen = new Objet();

    this.programTex = new Program();
    this.fxaa = new Program();
    this.blurH = new Program();
    this.blurV = new Program();
    this.dof = new Program();
    this.debug = new Program();

    this.occlusion = new Occlusion();

    this.saveFbo = new Framebuffer();
  }


  setup(path) {
    var canvas = document.getElementById("canvas3d");
    var w = canvas.getAttribute("width"); var h = canvas.getAttribute("height");

    this.ppb.setup(w, h);
    this.saveFbo.setup(w, h);
    this.programTex.setup(path+"shader/basiqueFlat");
    this.fxaa.setup(path+"shader/basiqueFlat", path+"shader/fxaa");
    this.blurH.setup(path+"shader/basiqueFlat", path+"shader/blurHorizontal");
    this.blurV.setup(path+"shader/basiqueFlat", path+"shader/blurVertical");
    this.dof.setup(path+"shader/basiqueFlat", path+"shader/dof");
    this.debug.setup(path+"shader/debugFlat", path+"shader/depth");
    this.screen.setupFlat();

    this.occlusion.setup(path);
  }


  begin(camera, model) { this.ppb.begin(); }
  end(){ this.ppb.end(); }

  beginSave(camera, model) { this.saveFbo.beginDraw(); }
  endSave(){ this.saveFbo.endDraw(); }


  render() {
    if(this.programTex.isReady() && this.screen.isReady()) {
      this.programTex.setTexture(this.ppb.getTexture());
      this.screen.draw(this.programTex.get());
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  Effect.propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
  };
}

Effect.defaultProps = {
  children: null,
  width: 100,
  height: 100,
};

Effect.contextTypes = {
  gl: PropTypes.object,
};

export default Effect;

