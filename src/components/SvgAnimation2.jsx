import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Styled = styled.svg``;

class SvgAnimation extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  componentDidMount() {
    console.log(this.div, this.props.children);
  }

  render() {
    return (
      <Styled
        innerRef={d => (this.div = d)}
        className={this.props.className}
        version="1.1"
        viewBox={this.props.viewBox}
      >
        {this.props.children}
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  SvgAnimation.propTypes = {
    className: PropTypes.string
  };
}

SvgAnimation.defaultProps = {
  className: ""
};

export default SvgAnimation;
