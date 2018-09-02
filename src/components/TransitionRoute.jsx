import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, withRouter } from "react-router-dom";

const TIME = 300;
const OFFSET = 10;

const In = keyframes`
	0% { opacity: 0; transform: translate3d(${OFFSET * 2}px, ${OFFSET}px, 0); }
	10% { transform: translate3d(-${OFFSET}px, -${OFFSET * 2}px, 0); }
	20% { transform: translate3d(-${OFFSET * 3}px, 0px, 0); }
	30% { transform: translate3d(0px, ${OFFSET * 2}px, 0); }
	40% { transform: translate3d(${OFFSET}px, -${OFFSET}px, 0); }
	50% { transform: translate3d(-${OFFSET}px, ${OFFSET * 2}px, 0); }
	60% { transform: translate3d(-${OFFSET * 3}px, ${OFFSET}px, 0); }
	70% { transform: translate3d(${OFFSET * 2}px, ${OFFSET}px, 0); }
	80% { transform: translate3d(-${OFFSET}px, -${OFFSET}px, 0); }
	90% { transform: translate3d(${OFFSET * 2}px, ${OFFSET * 2}px, 0); }
	100% { opacity: 1; transform: translate3d(${OFFSET}px, -${OFFSET * 2}px, 0); }
`;

const glitchHorizontal = keyframes`
	0% {
    top: 2%;
    height: 3%;
	}
	10% {
    top: 15%;
    height: 1%;
	}
	20% {
    top: 10%;
    height: 10%;
	}
	30% {
    top: 1%;
    height: 1%;
	}
	40% {
    top: 33%;
    height: 33%;
	}
	50% {
    top: 44%;
    height: 16%;
	}
	60% {
    top: 50%;
    height: 30%;
	}
	70% {
    top: 70%;
    height: 20%;
	}
	80% {
    top: 80%;
    height: 20%;
	}
	90% {
    top: 50%;
    height: 5%;
	}
	100% {
    top: 70%;
    height: 10%;
	}
`;

const StyledTransitionGroup = styled(TransitionGroup)`
  .fade-enter-active,
  .fade-exit-active {
    @supports (
      (clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%)) or
        (-webkit-clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%))
    ) {
      &::after {
        content: "";
        position: fixed;
        top: 2%;
        left: 0;
        width: 100%;
        height: 3%;
        background-color: ${p => p.theme.primary};
        animation: ${glitchHorizontal} ${TIME}ms infinite linear alternate;
        background-blend-mode: multiply;
      }
    }
  }
  .fade-enter-active {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    animation: ${In} ${TIME}ms linear forwards;
  }
  .fade-exit-active {
    animation: ${In} ${TIME}ms linear forwards reverse;
  }
`;

const TransitionRoute = props => {
  const { location, names, timeout, timing, children } = props;
  return (
    <StyledTransitionGroup names={names} timeout={timeout} timing={timing}>
      <CSSTransition key={location.key} timeout={TIME} classNames="fade">
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </StyledTransitionGroup>
  );
};

export default withRouter(TransitionRoute);
