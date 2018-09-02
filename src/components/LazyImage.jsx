import React, { Component, Fragment } from "react";
import styled from "styled-components";

import GlitchImage from "./GlitchImage";

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
`;
const IMG = styled.img`
  opacity: ${p => (p.loaded ? 1 : 0)};
  visibility: ${p => (p.loaded ? "visible" : "hidden")};
  transition: opacity 300ms ease-out;
`;

class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState(() => ({ loaded: true }));
  }

  render() {
    const { loaded } = this.state;
    const {
      className,
      waitingHeight,
      withGlitch,
      alt,
      width,
      height,
      children,
      src
    } = this.props;
    return (
      <Wrap className={className}>
        <IMG
          alt={alt}
          src={src}
          onLoad={this.handleLoad}
          loaded={loaded}
          width={width || "auto"}
          height={height || "auto"}
        />
        {loaded && withGlitch && <GlitchImage src={src} />}
        {!loaded && children}
      </Wrap>
    );
  }
}

export default LazyImage;
