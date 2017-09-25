import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Primitive extends Component {
  constructor(props) {
		super(props);

		this.nbPoints = 0;
		this.modeDessin;
		this.modeCalcul;
		this.vbo = new Array(5);

		for (let i = 0; i < 5; i++) {
			this.vbo[i] = null;
		}
	}


	componentWillMount() {
		const { gl } = this.context;
		const { mode } = this.props;

		switch(mode) {
			case 'TRIANGLES': default: this.modeDessin = gl.TRIANGLES; break;
			case 'LINES': this.modeDessin = gl.LINES; break;
			case 'POINTS': this.modeDessin = gl.POINTS; break;
			case 'LINE_STRIP': this.modeDessin = gl.LINE_STRIP; break;
			case 'LINE_LOOP': this.modeDessin = gl.LINE_LOOP; break;
		}

		this.modeCalcul =
			gl.STATIC_DRAW;
			// gl.STATIC_DRAW // change pas
			// gl.DYNAMIC_DRAW // repete
			// gl.STREAM_DRAW // une fois au moins

		this.setupCube();
		// this.setupPlane();
	}


	setupPlane() {
		const points = [
			-1, -1, 0,
			1,  -1, 0,
			-1, 1,  0,
			1,  1,  0,
			1,  -1, 0,
			-1, 1,  0
		];
		this.setupCustom(points);
	}

	setupCube() {
		const points = [
			-1.0,-1.0,-1.0,
			-1.0,-1.0, 1.0,
			-1.0, 1.0, 1.0,
			1.0, 1.0,-1.0,
			-1.0,-1.0,-1.0,
			-1.0, 1.0,-1.0,
			1.0,-1.0, 1.0,
			-1.0,-1.0,-1.0,
			1.0,-1.0,-1.0,
			1.0, 1.0,-1.0,
			1.0,-1.0,-1.0,
			-1.0,-1.0,-1.0,
			-1.0,-1.0,-1.0,
			-1.0, 1.0, 1.0,
			-1.0, 1.0,-1.0,
			1.0,-1.0, 1.0,
			-1.0,-1.0, 1.0,
			-1.0,-1.0,-1.0,
			-1.0, 1.0, 1.0,
			-1.0,-1.0, 1.0,
			1.0,-1.0, 1.0,
			1.0, 1.0, 1.0,
			1.0,-1.0,-1.0,
			1.0, 1.0,-1.0,
			1.0,-1.0,-1.0,
			1.0, 1.0, 1.0,
			1.0,-1.0, 1.0,
			1.0, 1.0, 1.0,
			1.0, 1.0,-1.0,
			-1.0, 1.0,-1.0,
			1.0, 1.0, 1.0,
			-1.0, 1.0,-1.0,
			-1.0, 1.0, 1.0,
			1.0, 1.0, 1.0,
			-1.0, 1.0, 1.0,
			1.0,-1.0, 1.0
		];
		this.setupCustom(points);
	}


	setupCustom(points) {
		const { gl } = this.context;
		this.vbo[0] = gl.createBuffer();
		this.nbPoints = 0;
		if(points != null) {
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
		gl.useProgram(program);
    gl.uniformMatrix4fv(program.mMatLoc, false, model);
  }


	draw(gl, program) {
		if(program.vLoc > -1) {
			gl.enableVertexAttribArray(program.vLoc);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
			gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
		}

		gl.drawArrays(this.modeDessin, 0, this.nbPoints);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}


	render() {
		const { program } = this.props;
		const { gl } = this.context;

		if (program) {
			gl.useProgram(program);

			this.setModelMatrice(gl, program);
			this.draw(gl, program);

			gl.useProgram(null);
		}
    return null;
  }
}

Primitive.propTypes = {
	model: PropTypes.object,
	mode: PropTypes.string,
	points: PropTypes.array,
	indices: PropTypes.array,
	program: PropTypes.object,
};

Primitive.defaultProps = {
	model: {},
	mode: 'TRIANGLES',
	points: [],
	indices: [],
	program: {},
};

Primitive.contextTypes = {
  gl: PropTypes.object,
};

export default Primitive;


