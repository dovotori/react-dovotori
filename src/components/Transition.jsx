import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const Styled = styled(CSSTransition)`
  ${p => {
    switch (p.classNames) {
      default:
      case "fade":
        return `
          opacity: ${p.in ? 1 : 0};

          &.fade-enter {
          }

          &.fade-enter.fade-enter-active {
            animation: ${fadeIn} ${p.timeout}ms ${p.timing} 1 0ms forwards;
          }

          &.fade-exit {
          }

          &.fade-exit.fade-exit-active {
            animation: ${fadeOut} ${p.timeout}ms ${p.timing} 1 0ms forwards;
          }
        `;
    }
  }};
`;

class Transition extends Component {
  render() {
    return (
      <Styled
        in={this.props.show}
        timeout={1000}
        classNames="fade"
        timing={this.props.timing}
      >
        {this.props.children}
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Transition.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool.isRequired,
    names: PropTypes.string,
    timeout: PropTypes.number,
    timing: PropTypes.string
  };
}

Transition.defaultProps = {
  children: null,
  names: "fade",
  timeout: 300,
  timing: "ease-out"
};

export default Transition;
