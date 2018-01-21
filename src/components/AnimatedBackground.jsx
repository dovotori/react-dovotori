/* global window, document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Scene from "./webgl/Scene";
import Camera from "./webgl/Camera";
import Vbo from "./webgl/Vbo";
import Objet from "./webgl/Objet";
import Program from "./webgl/Program";
import Primitive from "./webgl/Primitive";
import Loop from "./webgl/Loop";
import Fbo from "./webgl/Fbo";
import Texture from "./webgl/Texture";
import Mat4 from "./geometry/Mat4";
import Vec3 from "./geometry/Vec3";
import { easeInOutElastic, degToRad, map } from "../utils/numbers";
import { walkman, ribbon } from "../constants/objets";

import ParseObj from "../utils/ParseObj";
import basique from "../shaders/basique";
import shadow from "../shaders/fakeshadow";
import shader from "../shaders/glitch1and2";
// import fxaa from '../shaders/fxaa';

const BackBanner = styled.div.attrs({
  className: "back-banner",
})`
  // position: absolute;
  // bottom: 0;
  // height: 40%;
  // width: 100%;
  // left: 0;
  // background-color: #000;
  // opacity: 0.2;
  // z-index: 1;
`;

const Wrap = styled.div.attrs({
  className: "animated-background",
})`
  width: 100%;
  height: ${p => p.height}px;
`;

const Styled = styled.div`
  position: fixed;
  text-align: center;
  width: 100%;
  height: auto;
  background: ${p => p.theme.dark};
  z-index: -1;

  .containerGL {
    position: relative;
    z-index: 2;
  }

  canvas {
    margin: 0 auto;
    width: 100%;
    height: ${p => p.height}px;
  }
`;

class AnimatedBackground extends Component {
  constructor(props) {
    super(props);

    this.toggleGlitching = this.toggleGlitching.bind(this);
    this.restartRotation = this.restartRotation.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.onAnimate = this.onAnimate.bind(this);
    this.onResize = this.onResize.bind(this);

    this.state = { cpt: 0 };

    this.coor = { x: 0, y: 0 };

    this.texSize = 1024;

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
    window.addEventListener("resize", this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.mouseMove, false);
    window.removeEventListener("resize", this.onResize, false);
  }

  onResize() {
    this.width = document.body.clientWidth;
    this.height = window.innerHeight;
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
    this.amplitude =
      this.amplitude === 0 ? (this.toggleAmpli ? 0.05 : -0.05) : 0;
    const delay = this.amplitude === 0 ? 10000 : 1000;
    window.setTimeout(this.toggleGlitching, Math.random() * delay);
    if (this.amplitude === 0) {
      this.toggleAmpli = !this.toggleAmpli;
    }
  }

  restartRotation() {
    this.refDate = Date.now();
    this.camAngle = this.camAngle === 315 ? 45 : this.camAngle + 90;
    this.finish = false;
  }

  onAnimate() {
    this.offsetX += (this.targetOffsetX - this.offsetX) * 0.04;

    for (let i = 0; i < this.models.length; i += 1) {
      const variantX = this.offsetX * (i - this.models.length / 2);
      this.models[i].identity();
      this.models[i].translate(variantX, 0, 0);
    }

    this.model2.identity();
    this.model2.rotate(this.state.cpt * 4, 0, 0, 1);
    this.model2.translate(0.2, 0, 0);

    this.model3.identity();
    this.model3.rotate(-this.state.cpt * 4, 0, 0, 1);
    this.model3.translate(-1.1, 0, 0);

    const diffTime = Date.now() - this.refDate;
    if (diffTime < this.timeDelay) {
      const tmpAngle = degToRad(
        easeInOutElastic(diffTime, this.camAngle, 90, this.timeDelay),
      );
      this.camPos.set(
        Math.sin(tmpAngle) * this.camDistance,
        this.camHeight,
        Math.cos(tmpAngle) * this.camDistance,
      );
    } else if (!this.finish) {
      const angle = degToRad(this.camAngle + 90);
      this.camPos.set(
        Math.sin(angle) * this.camDistance,
        this.camHeight,
        Math.cos(angle) * this.camDistance,
      );
      this.req = window.setTimeout(this.restartRotation, 4000);
      this.finish = true;
    }

    this.setState(prevState => ({
      cpt: prevState.cpt + 1,
    }));
  }

  render() {
    this.width = document.body.clientWidth;
    this.height = window.innerHeight;

    return (
      <Wrap height={this.height}>
        <Styled width={this.width} height={this.height}>
          <BackBanner />
          <Scene width={this.texSize} height={this.texSize}>
            <Loop onAnimate={this.onAnimate}>
              <Camera
                width={this.width}
                height={this.height}
                position={this.camPos.get()}
                angle={40}
              >
                <Program vertex={basique.vertex} fragment={basique.fragment}>
                  <Vbo points={this.points}>
                    {this.objets.map((obj, idx) => (
                      <Objet
                        key={obj.key}
                        indices={obj.vID}
                        mode="LINE_LOOP"
                        model={this.models[idx].get()}
                        color={[102 / 255, 1, 204 / 255, 1]}
                      />
                    ))}
                  </Vbo>
                </Program>
                <Program vertex={basique.vertex} fragment={basique.fragment}>
                  <Vbo points={this.points2}>
                    {this.objets2.map(obj => (
                      <span key={obj.key}>
                        <Objet
                          indices={obj.vID}
                          mode="LINE_LOOP"
                          model={this.model2.get()}
                          color={[102 / 255, 1, 204 / 255, 1]}
                        />
                        <Objet
                          indices={obj.vID}
                          mode="LINE_LOOP"
                          model={this.model3.get()}
                          color={[102 / 255, 1, 204 / 255, 1]}
                        />
                      </span>
                    ))}
                  </Vbo>
                </Program>

                <Program vertex={shadow.vertex} fragment={shadow.fragment}>
                  <Vbo points={this.points}>
                    {this.objets.map((obj, idx) => (
                      <Objet
                        key={obj.key}
                        indices={obj.vID}
                        mode="TRIANGLE_LOOP"
                        model={this.models[idx].translate(0, -2, 0).get()}
                        color={[102 / 255, 1, 204 / 255, 1]}
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
                  width={this.texSize}
                  height={this.texSize}
                  filter="NEAREST_MIPMAP_LINEAR"
                >
                  <Texture
                    id={1}
                    width={this.texSize}
                    height={this.texSize}
                    filter="NEAREST_MIPMAP_LINEAR"
                  >
                    <Primitive />
                  </Texture>
                </Fbo>
              </Program>
            </Loop>
          </Scene>
        </Styled>
      </Wrap>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  AnimatedBackground.propTypes = {};
}

AnimatedBackground.defaultProps = {};

export default AnimatedBackground;
