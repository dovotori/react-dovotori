import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import LazyImage from "./LazyImage";
import { getTeaserPath } from "../utils";
import Loader from "./Loader";

const fromLeft = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: none; opacity: 1; }
`;

const fromRight = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: none; opacity: 1; }
`;

const LINK = styled(Link).attrs({
  className: "teaser"
})`
  position: relative;
  display: block;
  text-decoration: none;
  padding: 5rem 0;
  width: 100%;
  text-align: center;
`;

const WrapImage = styled.div`
  animation: ${p => (!p.isLeft ? fromLeft : fromRight)} 200ms
    ${p => p.theme.elastic} forwards;
  background: ${p => p.theme.gradient};
`;

const StyledLazyImage = styled(LazyImage)`
  max-width: 100%;
  width: 400px;
  height: auto;
  min-height: 150px;
  img {
    display: block;
  }
`;

const StyledLoader = styled(Loader)``;

const Infos = styled.div`
  position: absolute;
  top: 50%;
  right: ${p => (p.isLeft ? "50%" : "auto")};
  left: ${p => (p.isLeft ? "auto" : "50%")};
  transform: translate3d(0, -50%, 0);
`;

const Text = styled.div`
  position: absolute;
  top: 30%;
  right: ${p => (p.isLeft ? "90%" : "auto")};
  left: ${p => (p.isLeft ? "auto" : "90%")};
  text-align: ${p => (p.isLeft ? "right" : "left")};
  animation: ${p => (!p.isLeft ? fromLeft : fromRight)} 400ms
    ${p => p.theme.elastic} forwards;
`;

const Title = styled.h3`
  display: inline-block;
  padding: 0.4rem 0.2rem 0.4rem 0.6rem;
  text-transform: lowercase;
  letter-spacing: 0.4em;
  background-color: #fff;
  font-weight: normal;
  margin: 0;
  color: ${p => p.theme.mild};
  white-space: nowrap;
`;

const Date = styled.p`
  display: inline-block;
  background-color: ${p => (p.isLeft ? p.theme.primary : p.theme.secondary)};
  color: ${p => p.theme.dark};
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  margin: 0;
  padding: 0.4rem 0.2rem 0.4rem 0.4rem;
  font-family: monospace;
`;

const Index = styled.span`
  display: inline-block;
  color: ${p => p.theme.primary};
  font-size: 3.5rem;
  transform: ${p =>
    p.hover ? (p.isLeft ? "scale(1.5)" : "scale(1.5)") : "none"};
  letter-spacing: 0.5rem;
  transition: transform 200ms ${p => p.theme.elastic};
  text-shadow: 0.2rem 0.2rem 0 ${p => p.theme.dark};
  font-family: monospace;
  font-weight: 100;
`;

class Teaser extends Component {
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
    const { entry, className, idx } = this.props;
    const isLeft = entry.category === 1;
    return (
      <LINK
        className={className}
        to={`/${entry.slug}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onMouseEnter}
        onBlur={this.onMouseLeave}
      >
        {this.state.hover && (
          <Infos isLeft={isLeft}>
            <WrapImage isLeft={isLeft}>
              <StyledLazyImage
                src={getTeaserPath(entry.slug)}
                alt={entry.title}
                width={400}
                height={150}
                withGlitch
              >
                <StyledLoader />
              </StyledLazyImage>
            </WrapImage>
            <Text isLeft={isLeft}>
              <Title isLeft={isLeft}>{entry.title}</Title>
              <br />
              <Date isLeft={isLeft}>{entry.date}</Date>
            </Text>
          </Infos>
        )}
        <Index isLeft={isLeft} hover={this.state.hover}>
          {idx < 10 ? `0${idx}` : idx}
        </Index>
      </LINK>
    );
  }
}

export default Teaser;
