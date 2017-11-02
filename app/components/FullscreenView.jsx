import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Wrap = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ${p => p.theme.elastic};
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ${p => p.theme.elastic};
  }




  .slide-enter {
    transform: translateY(-100%);
  }

  .slide-enter.slide-enter-active {
    transform: none;
    transition: transform 300ms ease-out;
  }

  .slide-exit {
    transform: none;
  }

  .slide-exit.slide-exit-active {
    transform: translateY(-100%);
    transition: transform 300ms ease-out;
  }
`;

const Styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${p => p.theme.gradient};
  width: 100%;
  height: 100%;
`;

const Fade = props => (
  <CSSTransition {...props} timeout={500} classNames="fade">
    {props.children}
  </CSSTransition>
);

class FullscreenView extends Component {
  render() {
    return (
      <Wrap>
        <TransitionGroup>
          {this.props.in && (
            <Fade>
              <Styled>{this.props.children}</Styled>
            </Fade>
          )}
        </TransitionGroup>
      </Wrap>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  FullscreenView.propTypes = {
    children: PropTypes.node,
    in: PropTypes.bool,
  };
}

FullscreenView.defaultProps = {
  children: null,
  in: false,
};

export default FullscreenView;
