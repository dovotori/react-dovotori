import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Svg from "./Svg";

const LINK = styled(Link)`
  dispkay: block;
  position: fixed;
  bottom: 90px;
  left: 20px;
  z-index: ${p => p.theme.zindex.content + 1};
`;

const StyledSvg = styled(Svg)`
  width: 40px;
  height: 40px;
  stroke: ${p => p.theme.primary};
  fill: none;
  stroke-width: 1.5;
`;

export default () => (
  <LINK to="/">
    <StyledSvg useid="back" />
  </LINK>
);
