import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LazyImage from "./LazyImage";
import Loader from "./Loader";
import { getTeaserPath } from "../utils";

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

const Index = styled.span`
  display: inline-block;
  color: ${p => (!p.isOrange ? p.theme.primary : p.theme.secondary)};
  font-size: 1rem;
  transform: ${p => (p.hover ? "scale(1.5)" : "none")};
  letter-spacing: 0.2rem;
  transition: transform 300ms ${p => p.theme.elastic};
  font-family: monospace;
  padding: 1rem 0;
`;

const StyledLazyImage = styled(LazyImage)`
  min-height: 50px;

  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
`;

const StyledLoader = styled(Loader)``;

const Title = styled.h3`
  display: inline-block;
  padding: 0.4rem 0.2rem 0.4rem 0.6rem;
  text-transform: lowercase;
  letter-spacing: 0.4em;
  background-color: #fff;
  font-weight: normal;
  margin: 0;
  color: ${p => p.theme.mild};
`;

const Date = styled.p`
  display: inline-block;
  background-color: ${p => (!p.isOrange ? p.theme.primary : p.theme.secondary)};
  color: ${p => p.theme.dark};
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  margin: 0;
  padding: 0.4rem 0.2rem 0.4rem 0.4rem;
  font-family: monospace;
`;

class Teaser extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { entry, className, idx } = this.props;
    const isOrange = entry.category === 1;
    return (
      <LINK className={className} to={`/${entry.slug}`}>
        <Index isOrange={isOrange}>{idx < 10 ? `0${idx}` : idx}</Index>
        <StyledLazyImage src={getTeaserPath(entry.slug)} alt={entry.title}>
          <StyledLoader />
        </StyledLazyImage>
        <Title>{entry.title}</Title>
        <br />
        <Date isOrange={isOrange}>{entry.date}</Date>
      </LINK>
    );
  }
}

export default Teaser;
