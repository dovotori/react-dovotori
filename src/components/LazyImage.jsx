import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Loader from "./Loader";

const WrapTexte = styled.div``;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: ${p => (p.loaded ? "auto" : `${p.waitingHeight}px`)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IMG = styled.img`
  opacity: ${p => (p.loaded ? 1 : 0)};
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
    const { className, waitingHeight, alt } = this.props;
    return (
      <Wrap
        className={className}
        loaded={loaded}
        waitingHeight={waitingHeight}
        alt={alt}
      >
        <IMG
          alt="."
          src={this.props.src}
          onLoad={this.handleLoad}
          loaded={loaded}
        />
        {!loaded && <Loader />}
      </Wrap>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  LazyImage.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    waitingHeight: PropTypes.number
  };
}

LazyImage.defaultProps = {
  alt: "",
  className: "",
  waitingHeight: 400
};

export default LazyImage;
