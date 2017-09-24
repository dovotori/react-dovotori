import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Objet extends Component {
  constructor(props) {
		super(props);

		this.nbPoints = 0;
		this.modeDessin;
		this.modeCalcul;
		this.points = new Array(5);
		this.vbo = new Array(5);

		for(let i = 0; i < 5; i++)
		{
			this.points[i] = null;
			this.vbo[i] = null;
		}
	}


	componentDidMount() {
		const { gl } = this.context;
		this.modeDessin =
			// gl.POINTS;
			gl.TRIANGLES;
			// gl.LINES;
			// gl.LINE_STRIP;
			// gl.LINE_LOOP;
		this.modeCalcul =
			gl.STATIC_DRAW;
			// gl.STATIC_DRAW // change pas
			// gl.DYNAMIC_DRAW // repete
			// gl.STREAM_DRAW // une fois au moins
		this.setupCube();
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
		this.points[0] = points;
		this.nbPoints = points.length / 3;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[0]), this.modeCalcul);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}


	draw() {
		const { program } = this.props;
		const { gl } = this.context;

		if (program) {
			gl.useProgram(program);

			if(program.vLoc > -1 && this.points[0] != null) {
				gl.enableVertexAttribArray(program.vLoc);
				gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
				gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
			}

			// if(program.nLoc > -1 && this.points[1] != null) {
			// 	gl.enableVertexAttribArray(program.nLoc);
			// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
			// 	gl.vertexAttribPointer(program.nLoc, 3, gl.FLOAT, false, 0, 0);
			// }

			// if(program.tLoc > -1 && this.points[2] != null) {
			// 	gl.enableVertexAttribArray(program.tLoc);
			// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[2]);
			// 	gl.vertexAttribPointer(program.tLoc, 2, gl.FLOAT, false, 0, 0);
			// }

			// if(program.cLoc > -1 && this.points[3] != null) {
			// 	gl.enableVertexAttribArray(program.cLoc);
			// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[3]);
			// 	gl.vertexAttribPointer(program.cLoc, 3, gl.FLOAT, false, 0, 0);
			// }

			gl.drawArrays(this.modeDessin, 0, this.nbPoints);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);
			gl.useProgram(null);
		}
	}


	// drawIndex(program) {
	// 	const { gl } = this.context;
	// 	gl.useProgram(program);

	// 	if(program.vLoc > -1 && this.points[0] != null) {
	// 		gl.enableVertexAttribArray(program.vLoc);
	// 		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
	// 		gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
	// 	}

	// 	if(program.nLoc > -1 && this.points[1] != null) {
	// 		gl.enableVertexAttribArray(program.nLoc);
	// 		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
	// 		gl.vertexAttribPointer(program.nLoc, 3, gl.FLOAT, false, 0, 0);
	// 	}

	// 	if(program.tLoc > -1 && this.points[2] != null) {
	// 		gl.enableVertexAttribArray(program.tLoc);
	// 		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[2]);
	// 		gl.vertexAttribPointer(program.tLoc, 2, gl.FLOAT, false, 0, 0);
	// 	}

	// 	if(program.cLoc > -1 && this.points[3] != null) {
	// 		gl.enableVertexAttribArray(program.cLoc);
	// 		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[3]);
	// 		gl.vertexAttribPointer(program.cLoc, 3, gl.FLOAT, false, 0, 0);
	// 	}

	// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vbo[3]);
	// 	gl.drawElements(this.modeDessin, this.nbPoints, gl.UNSIGNED_SHORT, 0);
	// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	// 	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	// 	gl.useProgram(null);
	// }


	render() {
		this.draw();
    return null;
  }
}

Objet.propTypes = {
	program: PropTypes.object,
};

Objet.defaultProps = {
	program: {},
};

Objet.contextTypes = {
  gl: PropTypes.object,
};

export default Objet;


