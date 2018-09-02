import React, { Children, cloneElement } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const fadeUp = keyframes`
  0% { transform: translateY(100%) scale(0); opacity: 0; }
  100% { transform: none; opacity: 1; }
`;

const StyledTransitionGroup = styled(TransitionGroup)`
  .fade-enter-active {
    animation: ${fadeUp} 500ms ${p => p.theme.elastic} forwards;
  }
  .fade-exit-active {
    animation: ${fadeUp} 500ms ${p => p.theme.elastic} forwards reverse;
  }
`;

const OnEnter = styled.div`
  opacity: 0;
  animation: ${fadeUp} 500ms linear forwards;
`;

const FadeUp = ({ children }) => (
  <StyledTransitionGroup>
    {Children.map(children, (child, idx) => (
      <CSSTransition key={child.key} timeout={500} classNames="fade">
        <OnEnter style={{ animationDelay: `${idx * 50}ms` }}>{child}</OnEnter>
      </CSSTransition>
    ))}
  </StyledTransitionGroup>
);

export default FadeUp;
