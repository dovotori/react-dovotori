import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, withRouter } from "react-router-dom";

const translateIn = keyframes`
0% { transform: translateX(-100%); }
100% { transform: none; }
`;

const translateOut = keyframes`
0% { transform: none; }
100% { transform: translateX(-100%); }
`;

const Styled = styled(TransitionGroup)`
  position: relative;
  overflow: visible;
  width: 100%;
  height: 100%;

  ${p => {
    switch (p.names) {
      default:
      case "left":
        return `
        .left-enter, .left-exit {
          overflow: hidden;
        }
        .left-enter, .left-exit {
          .anim-content {
            transform-origin: 50% 50%;
            transform: translateX(-100%);
            transition: transform ${p.timeout}ms ${p.timing};
          }
        }
        .left-enter.left-enter-active {
          .anim-content {
            transform: none;
          }
        }
        .left-exit.left-exit-active {
          .anim-content {
            transform: translateX(-100%);
          }
        }
        `;
      case "translate":
        return `
        .translate-enter, .translate-exit {
          position: absolute;
          top: 0;
          left: 0;
          overflow: visible;
          height: 100%;
          width: 100%;

          .wrap-content {
            overflow: hidden;
          }
        }
        .translate-enter {
          .anim-content {
            transform-origin: 0 0;
            transform: translateX(-100%);
          }
        }
        .translate-enter.translate-enter-active {
          .anim-content {
            animation: ${translateIn} ${p.timeout / 2}ms ${
          p.timing
        } 1 ${p.timeout / 2}ms forwards;
          }
        }

        .translate-exit {
          .anim-content {
            transform-origin: 0 0;
            transform: none;
          }
        }

        .translate-exit.translate-exit-active {
          .anim-content {
            animation: ${translateOut} ${p.timeout / 2}ms ${
          p.timing
        } 1 0ms forwards;
          }
        }
        `;
    }
  }};
`;

class TransitionRoute extends Component {
  render() {
    const { location, names, timeout, timing } = this.props;
    return (
      <Styled names={names} timeout={timeout} timing={timing}>
        <CSSTransition key={location.key} classNames={names} timeout={timeout}>
          <Switch location={location}>{this.props.children}</Switch>
        </CSSTransition>
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  TransitionRoute.propTypes = {
    children: PropTypes.node,
    names: PropTypes.string,
    timeout: PropTypes.number,
    timing: PropTypes.string,
  };
}

TransitionRoute.defaultProps = {
  children: null,
  names: "left",
  timeout: 300,
  timing: "ease-out",
};

export default withRouter(TransitionRoute);
