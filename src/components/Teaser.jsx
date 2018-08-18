import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LazyImage from "./LazyImage";
import Overline from "./Overline";

const OFFSET_X = 50;
const IMG_WIDTH = 400;

const LINK = styled(Link).attrs({
  className: "teaser",
}) `
  position: relative;
  display: block;
  text-decoration: none;
  margin: 0 0 30px;
  width: 100%;
  max-width: ${IMG_WIDTH}px;
  margin: 0 auto;
`;

const Banner = styled.div`
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 100%;
  margin: 0 auto;

  ${p => p.theme.media.mobile`
    width: 100%;
    height: auto;
  `};
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${p => (p.isprimary ? p.theme.gradient : p.theme.gradient2)};
`;

const StyledLazyImage = styled(LazyImage) `
  img {
    display: inline-block;
    vertical-align: middle;
    transition: transform 0.3s ${p => p.theme.elastic2},
      opacity 0.2s ${p => p.theme.elastic2};
    opacity: 0.8;

    ${p => p.theme.media.mobile`
    width: 100%;
    height: auto;
  `};
  }
`;

const Infos = styled.div.attrs({
  className: "infos",
}) `
  position: relative;
  z-index: 2;
  max-width: ${IMG_WIDTH}px;
  margin: 0 auto;
  text-align: ${p => (p.idx % 2 ? "right" : "left")};
  padding-bottom: 30px;
`;

const Cross = styled.div`
  position: relative;
  max-width: ${IMG_WIDTH}px;
  width: 100%;
  margin: 0 auto;
  z-index: 3;

  div {
    position: absolute;
    ${p => (p.idx % 2 === 0 ? "left: 0;" : "right: 0;")} top: 0;

    &::after,
    &::before {
      position: absolute;
      content: "";
      background-color: ${p => p.theme.light};
    }

    &::after {
      width: 1px;
      height: 40px;
      top: -20px;
      left: 0;
    }

    &::before {
      width: 40px;
      height: 1px;
      left: -20px;
      top: 0;
    }
  }

  ${p => p.theme.media.mobile`
    display: none;
  `};
`;

const H5 = styled.h5`
  position: relative;
  z-index: 1;

  span {
    display: inline-block;
    padding: 4px 0 4px 0.4em;
    font-size: 1.1em;
    text-transform: lowercase;
    letter-spacing: 0.4em;
    font-weight: 500;
    background-color: #fff;
    color: ${p => p.theme.mild};
  }
`;

const Date = styled.p`
  padding: 0;
  line-height: 0.8em;

  span {
    background-color: ${p =>
    p.isprimary ? p.theme.primary : p.theme.secondary};
    color: ${p => p.theme.dark};
  }
`;

const Number = styled.p`
  position: absolute;
  bottom: 0;
  right: 50%;
  font-family: ${p => p.theme.font2};
  text-align: right;
  color: ${p => p.theme.dark};
  font-size: 0.7em;
  padding: 2px 0;
  transform: translateX(230px);
  letter-spacing: 0.1em;
`;

const BackLine = styled.div.attrs({
  className: "back-line",
}) `
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transform: ${p =>
    p.hover ? "translateY(-50%) scaleY(1)" : "translateY(-50%) scaleY(0)"};
  transition: transform 0.5s ${p => p.theme.elastic2},
    opacity 0.5s ${p => p.theme.elastic2};
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
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const { entry, className, idx, noHover } = this.props;
    const isprimary = entry.category === 0;
    return (
      <LINK
        className={className}
        to={`/${entry.slug}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onMouseEnter}
        onBlur={this.onMouseLeave}
      >
        <Banner hover={this.state.hover}>
          <Back isprimary={isprimary} />
          <StyledLazyImage
            src={`./assets/teasers/${entry.slug}.png`}
            hover={this.state.hover}
            noHover={noHover}
            alt={entry.title}
            waitingHeight={100}
          />
        </Banner>
        <Infos noHover={noHover} idx={idx}>
          <H5 hover={this.state.hover} isprimary={isprimary} noHover={noHover}>
            <span>{entry.title}</span>
          </H5>
          {/* <Cross idx={idx}>
            <div />
          </Cross> */}
          <Date
            hover={this.state.hover}
            isprimary={isprimary}
            noHover={noHover}
          >
            <Overline>{entry.date}</Overline>
          </Date>
        </Infos>
      </LINK>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Teaser.propTypes = {
    className: PropTypes.string,
    entry: PropTypes.shape({
      id: PropTypes.number,
      slug: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.number,
      tags: PropTypes.array,
      date: PropTypes.number,
      description: PropTypes.string,
    }),
    idx: PropTypes.number,
    noHover: PropTypes.bool,
  };
}

Teaser.defaultProps = {
  className: "",
  entry: {},
  idx: 0,
  noHover: false,
};

export default Teaser;
