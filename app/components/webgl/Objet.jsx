import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Objet extends Component {
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


	componentDidMount() {
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

		// this.setupCube();
		// this.setupPlane();
		this.applyIndex();
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


	applyIndex() {
		const { points, indices } = this.props;
		const { gl } = this.context;
		this.nbPoints = indices.length;

		// VERTICE
		this.vbo[0] = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), this.modeCalcul);

		// INDICES
		this.vbo[3] = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vbo[3]);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.modeCalcul);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}


	draw() {
		const { program } = this.props;
		const { gl } = this.context;

		if (program) {
			gl.useProgram(program);

			if(program.vLoc > -1) {
				gl.enableVertexAttribArray(program.vLoc);
				gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
				gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
			}

			gl.drawArrays(this.modeDessin, 0, this.nbPoints);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);
			gl.useProgram(null);
		}
	}


	drawIndex() {
		const { program } = this.props;
		const { gl } = this.context;

		if (program) {
			gl.useProgram(program);
			if(program.vLoc > -1) {
				gl.enableVertexAttribArray(program.vLoc);
				gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
				gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
			}

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vbo[3]);
			gl.drawElements(this.modeDessin, this.nbPoints, gl.UNSIGNED_SHORT, 0);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);

			gl.useProgram(null);
		}
	}


	render() {
		// this.draw();
		this.drawIndex();
    return null;
  }
}

Objet.propTypes = {
	mode: PropTypes.string,
	points: PropTypes.array,
	indices: PropTypes.array,
	program: PropTypes.object,
};

Objet.defaultProps = {
	mode: 'TRIANGLES',
	points: [],
	indices: [],
	program: {},
};

Objet.contextTypes = {
  gl: PropTypes.object,
};

export default Objet;


