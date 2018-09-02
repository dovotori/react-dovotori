import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import BackArrow from "../../assets/svg/arrow.svg";

const LINK = styled(Link)`
  display: block;
  margin: 2rem 0;
  padding: 2rem 0;
  &:focus {
    outline: 0;
  }
`;

const StyledBackArrow = styled(BackArrow)`
  fill: ${p => p.theme.primary};
  stroke-width: 1.5;
  width: 2rem;
  height: 2rem;
`;

export default () => (
  <LINK to="/">
    <StyledBackArrow />
  </LINK>
);
