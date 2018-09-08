import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import BackArrow from "../../assets/svg/arrow3.svg";

const enter = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: none; opacity: 1; }
`;

const LINK = styled(Link)`
  position: relative;
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
  width: auto;
  height: 1rem;
  margin: 0 0.1rem;
`;

const EnterArrow = styled(StyledBackArrow)`
  opacity: 0;
  animation: ${enter} 300ms 1 ${p => p.theme.elastic1} forwards;
`;

const Span = styled.span`
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translate3d(0, -50%, 0);
  display: inline-block;
  color: ${p => p.theme.primary};
  text-shadow: 1px 1px 0 ${p => p.theme.dark};
  font-size: 0.8rem;
  letter-spacing: 0.5rem;
  font-family: monospace;
  font-weight: 100;
`;

class ButtonBack extends Component {
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
      <LINK
        to="/"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <StyledBackArrow />
        {this.state.hover &&
          [1, 2].map(idx => (
            <EnterArrow
              key={idx}
              style={{ animationDelay: `${idx * 100}ms` }}
            />
          ))}
        <Span>back</Span>
      </LINK>
    );
  }
}

export default ButtonBack;
