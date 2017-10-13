/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Scene from './webgl/Scene';
import Camera from './webgl/Camera';
import Vbo from './webgl/Vbo';
import Objet from './webgl/Objet';
import Program from './webgl/Program';
import Primitive from './webgl/Primitive';
import Loop from './webgl/Loop';
import Fbo from './webgl/Fbo';
import Texture from './webgl/Texture';
import Mat4 from './geometry/Mat4';
import Vec3 from './geometry/Vec3';
import {
  easeInOutElastic,
  degToRad,
  map
} from '../utils/numbers';

import ParseObj from '../utils/ParseObj';
import basique from '../shaders/basique';
import shadow from '../shaders/fakeshadow';
import shader from '../shaders/glitch1and2';
import fxaa from '../shaders/fxaa';


const Styled = styled.div`
width: 100%;
text-align: center;

canvas {
  margin: 0 auto;
  max-width: ${p => p.width}px;
  max-height: ${p => p.height}px;
  width: 100%;
  height: auto;
  min-width: 400px;
  min-height: 400px;
}
`;

class AnimatedBackground extends Component {
  constructor(props) {
    super(props);

    this.toggleGlitching = this.toggleGlitching.bind(this);
    this.restartRotation = this.restartRotation.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.onAnimate = this.onAnimate.bind(this);
    this.state = { cpt: 0 };

    this.coor = { x: 0, y: 0 };

    this.width = 1024;
    this.height = 1024;

    const p = new ParseObj();
    p.setup(walkman);

    this.points = p.getVerticesList();
    this.objets = p.getObjets();

    const p2 = new ParseObj();
    p2.setup(ribbon);

    this.points2 = p2.getVerticesList();
    this.objets2 = p2.getObjets();

    // this.objets = this.objets.slice(3, 4);

    this.models = new Array(this.objets.length);
    for (let i = 0; i < this.models.length; i += 1) {
      this.models[i] = new Mat4();
      this.models[i].identity();
    }

    this.model = new Mat4();
    this.model.identity();

    this.model2 = new Mat4();
    this.model2.identity();

    this.model3 = new Mat4();
    this.model3.identity();

    this.model4 = new Mat4();
    this.model4.identity();
    this.model4.scale(0.9, 0.9, 0.9);
    this.model4.translate(0, -2, 0);

    this.camPos = new Vec3();
    this.camAngle = 45;
    this.camDistance = 14;
    this.refDate = Date.now();
    this.timeDelay = 1000;
    this.finish = false;
    this.camHeight = 4;

    this.amplitude = 0;
    this.toggleAmpli = false;

    this.offsetX = 0;
    this.targetOffsetX = 0;
  }


  // shouldComponentUpdate() {
  //   return false;
  // }


  componentWillMount() {
    window.addEventListener("mousemove", this.mouseMove, false);
  }


  componentDidMount() {
    this.toggleGlitching();
  }


  componentWillUnmount() {
    window.removeEventListener("mousemove", this.mouseMove, false);
  }


  mouseMove(e) {
    this.coor = {
      x: e.clientX,
      y: e.clientY,
    };

    const relX = map(this.coor.x / window.innerWidth, 0, 1, 0, Math.PI);
    this.targetOffsetX = Math.cos(relX);
  }


  toggleGlitching() {
    this.amplitude = this.amplitude === 0 ? this.toggleAmpli ? 0.05 : -0.05 : 0;
    const delay = this.amplitude === 0 ? 10000 : 1000;
    window.setTimeout(this.toggleGlitching, Math.random() * delay);
    if (this.amplitude === 0) { this.toggleAmpli = !this.toggleAmpli; }
  }


  restartRotation() {
    this.refDate = Date.now();
    this.camAngle = this.camAngle === 315 ? 45 : this.camAngle + 90;
    this.finish = false;
  }


  onAnimate() {
    this.offsetX += (this.targetOffsetX - this.offsetX) * 0.04;

    for (let i = 0; i < this.models.length; i += 1) {
      const variantX = this.offsetX * (i - (this.models.length / 2));
      this.models[i].identity();
      this.models[i].translate(variantX, 0, 0);
    }

    this.model2.identity();
    this.model2.rotate(this.state.cpt * 4, 0,0,1);
    this.model2.translate(0.2,0,0);

    this.model3.identity();
    this.model3.rotate(-this.state.cpt * 4, 0,0,1);
    this.model3.translate(-1.1,0,0);

    const diffTime = Date.now() - this.refDate;
    if (diffTime < this.timeDelay) {
      const tmpAngle = degToRad(
        easeInOutElastic(
          diffTime, this.camAngle, 90, this.timeDelay
        )
      );
      this.camPos.set(
        Math.sin(tmpAngle) * this.camDistance,
        this.camHeight,
        Math.cos(tmpAngle) * this.camDistance
      );
    } else if (!this.finish) {
      const angle = degToRad(this.camAngle + 90);
      this.camPos.set(
        Math.sin(angle) * this.camDistance,
        this.camHeight,
        Math.cos(angle) * this.camDistance
      );
      this.req = window.setTimeout(this.restartRotation, 4000);
      this.finish = true;
    }

    this.setState((prevState) => ({
      cpt: prevState.cpt + 1,
    }));
  }


  render() {
    return (<Styled
      width={this.width}
      height={this.height}
    >
      <Scene
        width={this.width}
        height={this.height}
      >
        <Loop onAnimate={this.onAnimate}>
          <Camera
            width={this.width}
            height={this.height}
            position={this.camPos.get()}
            angle={40}
          >
            <Program
              vertex={basique.vertex}
              fragment={basique.fragment}
            >
              <Vbo points={this.points}>
                {this.objets.map((obj, idx) => (
                  <Objet
                    key={obj.key}
                    indices={obj.vID}
                    mode="LINE_LOOP"
                    model={this.models[idx].get()}
                    // model={this.model.get()}
                    color={[102/255, 1, 204/255, 1]}
                  />
                ))}
              </Vbo>
            </Program>
            <Program
              vertex={basique.vertex}
              fragment={basique.fragment}
            >
              <Vbo points={this.points2}>
                {this.objets2.map((obj, idx) => (
                  <span key={obj.key}>
                    <Objet
                      indices={obj.vID}
                      mode="LINE_LOOP"
                      model={this.model2.get()}
                      color={[102/255, 1, 204/255, 1]}
                    />
                    <Objet
                      indices={obj.vID}
                      mode="LINE_LOOP"
                      model={this.model3.get()}
                      color={[102/255, 1, 204/255, 1]}
                    />
                  </span>
                ))}
              </Vbo>
            </Program>

            <Program
              vertex={shadow.vertex}
              fragment={shadow.fragment}
            >
              <Vbo points={this.points}>
                {this.objets.map((obj, idx) => (
                  <Objet
                    key={obj.key}
                    indices={obj.vID}
                    mode="TRIANGLE_LOOP"
                    model={this.models[idx].translate(0, -2, 0).get()}
                    color={[102/255, 1, 204/255, 1]}
                  />
                ))}
              </Vbo>
            </Program>
          </Camera>

          <Program
            vertex={shader.vertex}
            fragment={shader.fragment}
            time={this.state.cpt}
            amplitude={this.amplitude}
          >
            <Fbo
              width={this.width}
              height={this.height}
            >
              <Texture
                id={1}
                width={this.width}
                height={this.height}
              >
                <Primitive />
              </Texture>
            </Fbo>
          </Program>

        </Loop>
      </Scene>
    </Styled>);
  }
}

AnimatedBackground.propTypes = {
};

AnimatedBackground.defaultProps = {};

export default AnimatedBackground;

const walkman = `
o cable_short_Cylinder.004
v 1.789920 -0.775653 -0.072126
v 1.244472 -0.775653 -0.072126
v 1.789920 -0.720498 -0.148039
v 1.244472 -0.720498 -0.148039
v 1.789920 -0.631257 -0.119043
v 1.244472 -0.631257 -0.119043
v 1.789920 -0.631257 -0.025209
v 1.244472 -0.631257 -0.025209
v 1.789920 -0.720498 0.003787
v 1.244472 -0.720498 0.003787
s off
f 1 2 4 3
f 3 4 6 5
f 5 6 8 7
f 7 8 10 9
f 9 10 2 1
o cable_long_Cylinder
v 4.050622 -0.741657 -0.071737
v 1.700853 -0.741657 -0.071737
v 4.050622 -0.669625 -0.113325
v 1.700853 -0.669625 -0.113325
v 4.050622 -0.669625 -0.030150
v 1.700853 -0.669625 -0.030150
s off
f 11 12 14 13
f 13 14 16 15
f 15 16 12 11
o box_Cube
v -1.805056 -1.000000 -0.406734
v 1.513614 -1.000000 -0.406734
v 1.513614 -1.000000 0.363852
v -1.805057 -1.000000 0.363852
v -1.805055 1.000000 -0.406734
v 1.513615 1.000000 -0.406733
v 1.513614 1.000000 0.363852
v -1.805056 1.000000 0.363852
s off
f 17 18 19 20
f 21 24 23 22
f 18 22 23 19
f 21 17 20 24
o box_tape_Cube.001
v -2.031313 -0.795160 -0.196439
v 0.906743 -0.795160 -0.196439
v 0.906743 -0.795160 0.544917
v -2.031314 -0.795160 0.544916
v -2.031313 0.795160 -0.196439
v 0.906744 0.795160 -0.196439
v 0.906742 0.795160 0.544917
v -2.031314 0.795160 0.544917
s off
f 25 26 27 28
f 29 32 31 30
f 26 30 31 27
f 29 25 28 32
o button_left_Cube.005
v -1.412209 0.909476 -0.112970
v -1.144745 0.909476 -0.112970
v -1.144745 0.909476 0.048300
v -1.412209 0.909476 0.048300
v -1.412209 1.157520 -0.112970
v -1.144745 1.157520 -0.112970
v -1.144745 1.157520 0.048300
v -1.412209 1.157520 0.048300
s off
f 33 34 35 36
f 37 40 39 38
f 34 38 39 35
f 37 33 36 40
o button_right_Cube.006
v -0.599556 0.909476 -0.112970
v -0.332092 0.909476 -0.112970
v -0.332092 0.909476 0.048300
v -0.599556 0.909476 0.048300
v -0.599556 1.157520 -0.112970
v -0.332092 1.157520 -0.112970
v -0.332092 1.157520 0.048300
v -0.599556 1.157520 0.048300
s off
f 41 42 43 44
f 45 48 47 46
f 42 46 47 43
f 45 41 44 48
`;

const ribbon = `
o ribbon_left_Cylinder.007
v 0.000000 -0.534181 0.070475
v 0.000000 -0.534181 -0.070475
v 0.377723 -0.377723 0.070476
v 0.377724 -0.377723 -0.070475
v 0.534182 0.000000 0.070476
v 0.534182 0.000000 -0.070475
v 0.377723 0.377723 0.070476
v 0.377724 0.377723 -0.070475
v 0.000000 0.534181 0.070475
v 0.000000 0.534181 -0.070475
v -0.377723 0.377723 0.070475
v -0.377723 0.377723 -0.070476
v -0.534181 -0.000000 0.070475
v -0.534181 -0.000000 -0.070476
v -0.377723 -0.377723 0.070475
v -0.377723 -0.377723 -0.070476
s off
f 1 2 4 3
f 3 4 6 5
f 5 6 8 7
f 7 8 10 9
f 9 10 12 11
f 11 12 14 13
f 13 14 16 15
f 15 16 2 1
o little_ribbon_left_Cylinder.011
v -0.000000 -0.092688 0.013602
v -0.000000 -0.092688 -0.013602
v 0.092688 0.000000 0.013602
v 0.092688 0.000000 -0.013602
v -0.000000 0.092688 0.013602
v -0.000000 0.092688 -0.013602
v -0.092688 0.000000 0.013602
v -0.092688 -0.000000 -0.013602
s off
f 17 18 20 19
f 19 20 22 21
f 21 22 24 23
f 23 24 18 17
`;