import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SvgAnimation from "./SvgAnimation2";
import Svg from "./Svg";
import Cursor from "./Cursor";
import Overline from "./Overline";

const Styled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  ${p => p.theme.media.mobile`
`};
`;

const AnimLetter = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 0 10px;
  overflow: hidden;
`;

const SVG = styled(Svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 300ms ease-out;
  transform: ${p => (p.loaded ? "none" : "translateX(-100%)")};
  fill: ${p => (p.color ? p.theme.primary : p.theme.mild)};
  z-index: ${p => (p.hover === "design" ? 1 : 0)};
`;

const SVGcode = SVG.extend`
  z-index: ${p => (p.hover === "code" ? 1 : 0)};
`;

const Name = styled(Overline)`
  display: inline-block;
  background-color: ${p => p.theme.primary};
  color: ${p => p.theme.dark};
`;

class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    window.setTimeout(() => {
      this.setState(() => ({ loaded: true }));
    }, 10);
  }

  shouldComponentUpdate(newProps, newState) {
    return (
      newState.loaded !== this.state.loaded ||
      newState.hover !== this.state.hover
    );
  }

  render() {
    const { loaded, hover } = this.state;
    return (
      <Styled>
        <AnimLetter>
          <SVG loaded={this.state.loaded} useid="letter-D" />
          <SVGcode color loaded={this.state.loaded} useid="letter-C" />
        </AnimLetter>
        <AnimLetter>
          <SVGcode color loaded={this.state.loaded} useid="letter-O" />
          <SVG loaded={this.state.loaded} useid="letter-E" />
        </AnimLetter>
        <AnimLetter>
          <SVGcode color loaded={this.state.loaded} useid="letter-D" />
          <SVG loaded={this.state.loaded} useid="letter-S" />
        </AnimLetter>
        <AnimLetter>
          <SVGcode color loaded={this.state.loaded} useid="letter-E" />
          <SVG loaded={this.state.loaded} useid="letter-I" />
        </AnimLetter>
        <AnimLetter>
          <SVG loaded={this.state.loaded} useid="letter-G" />
        </AnimLetter>
        <AnimLetter>
          <SVG loaded={this.state.loaded} useid="letter-N" />
        </AnimLetter>
        <Name>dorian ratovo</Name>
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Signature.propTypes = {};
}

Signature.defaultProps = {};

export default Signature;
