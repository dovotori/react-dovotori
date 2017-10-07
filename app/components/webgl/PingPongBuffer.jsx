import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Effect extends Component {
  constructor(props) {
    super(props);
    this.fbos = [];
    this.currentFbo = 0;
  }


  setup(width, height) {
    this.fbos[0] = new Framebuffer(); this.fbos[0].setup(width, height);
    this.fbos[1] = new Framebuffer(); this.fbos[1].setup(width, height);
  }


  begin() {
    this.fbos[this.currentFbo].beginDraw();
  }


  end() {
    this.fbos[this.currentFbo].endDraw();
  }


  swap() {
    if(this.currentFbo < 1){ this.currentFbo++; } else { this.currentFbo = 0; }
  }
}


PingPongBuffer.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
};

PingPongBuffer.defaultProps = {
  children: null,
  width: 100,
  height: 100,
};

PingPongBuffer.contextTypes = {
  gl: PropTypes.object,
};

export default PingPongBuffer;
