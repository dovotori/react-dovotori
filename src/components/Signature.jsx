import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../../assets/svg/head.svg";
import Body from "../../assets/svg/body.svg";
import C from "../../assets/svg/C.svg";
import O from "../../assets/svg/O.svg";
import D from "../../assets/svg/D.svg";
import E from "../../assets/svg/E.svg";
import S from "../../assets/svg/S.svg";
import I from "../../assets/svg/I.svg";
import G from "../../assets/svg/G.svg";
import N from "../../assets/svg/N.svg";

const Styled = styled.div`
  position: fixed;
  top: 50%;
  width: 100%;
  transform: translate3d(0, -50%, 0);
`;

const WrapCode = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 50%;
  transform: translate3d(0, -50%, 0);
  text-align: center;
`;

const WrapDesign = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  width: 50%;
  transform: translate3d(0, -50%, 0);
  text-align: center;
`;

const commonLetter = css`
  margin: 0 0.4rem;
  height: 2rem;
  width: auto;
  fill: ${p => p.theme.mild};
  stroke: ${p => p.theme.dark};
`;

const StyledC = styled(C)`
  ${commonLetter};
`;
const StyledO = styled(O)`
  ${commonLetter};
`;
const StyledD = styled(D)`
  ${commonLetter};
`;
const StyledE = styled(E)`
  ${commonLetter};
`;

const StyledS = styled(S)`
  ${commonLetter};
`;

const StyledI = styled(I)`
  ${commonLetter};
`;

const StyledG = styled(G)`
  ${commonLetter};
`;

const StyledN = styled(N)`
  ${commonLetter};
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: ${p =>
    p.hover
      ? "translate3d(-50%, -50%, 0) scale(1.2)"
      : "translate3d(-50%, -50%, 0)"};
  transition: transform 300ms ${p => p.theme.elastic2};
`;

const StyledLogo = styled(Logo)`
  stroke: ${p => p.theme.mild};
  fill: ${p => (p.hover ? p.theme.mild : "none")};
  stroke-width: 0.1;
  overflow: visible;
  width: 100%;
  height: 100%;
`;

const StyledBody = styled(Body)`
  stroke: ${p => p.theme.mild};
  fill: ${p => p.theme.mild};
  stroke-width: 0.1;
  overflow: visible;
  width: 200px;
  height: auto;
`;

class Signature extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = { hover: false };
  }

  shouldComponentUpdate(newProps, newState) {
    return this.state.hover !== newState.hover;
  }

  onMouseEnter() {
    this.setState(() => ({ hover: true }));
  }

  onMouseLeave() {
    this.setState(() => ({ hover: false }));
  }

  render() {
    return (
      <Styled>
        <StyledLink
          to="/about"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          hover={this.state.hover ? 1 : 0}
        >
          <StyledLogo hover={this.state.hover ? 1 : 0} />
          {this.state.hover && <StyledBody />}
        </StyledLink>
        <WrapCode>
          <StyledC />
          <StyledO />
          <StyledD />
          <StyledE />
        </WrapCode>
        <WrapDesign>
          <StyledD />
          <StyledE />
          <StyledS />
          <StyledI />
          <StyledG />
          <StyledN />
        </WrapDesign>
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Signature.propTypes = {};
}

Signature.defaultProps = {};

export default Signature;
