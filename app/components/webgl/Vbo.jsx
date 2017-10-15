import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';


class Vbo extends Component {
  constructor(props) {
    super(props);

    this.modeCalcul = null;
    this.vbo = new Array(5);

    for (let i = 0; i < 5; i += 1) {
      this.vbo[i] = null;
    }
	}


	componentWillMount() {
		const { points } = this.props;
    const { gl } = this.context;

    this.modeCalcul =
      gl.STATIC_DRAW;
      // gl.STATIC_DRAW // change pas
      // gl.DYNAMIC_DRAW // repete
      // gl.STREAM_DRAW // une fois au moins

		this.vbo[0] = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), this.modeCalcul);
  }


  componentWillUpdate() {
    const { gl } = this.context;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }


  render() {
    const { gl, program } = this.context;

    if (program.vLoc > -1) {
      gl.enableVertexAttribArray(program.vLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
      gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);

      return this.props.children;
    }
    return null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Vbo.propTypes = {
    children: PropTypes.node,
    points: PropTypes.array,
  };
}

Vbo.defaultProps = {
  children: null,
	points: [],
};

Vbo.contextTypes = {
  gl: PropTypes.object,
  program: PropTypes.object,
};

export default Vbo;
