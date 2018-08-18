import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Svg from "./Svg";

const LINK = styled(Link).attrs({
  className: "wrap-content"
})`
  dispkay: block;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: ${p => p.theme.zindex.content + 1};
  width: 40px;
  height: 40px;

  &:focus {
    outline: 0;
  }
`;

const StyledSvg = styled(Svg).attrs({
  className: "anim-content"
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  fill: ${p => p.theme.light};
  stroke-width: 1.5;
  transition: box-shadow 300ms ease-out;
  &:hover {
    box-shadow: -2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;

export default () => (
  <LINK to="/">
    <StyledSvg useid="arrow-previous" />
  </LINK>
);
