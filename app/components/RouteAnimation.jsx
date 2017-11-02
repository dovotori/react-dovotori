import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
  width: 100%;
  height: calc(100% - 101px);
  bottom: 0;
  background: url('../assets/img/stripes.png') #fff repeat;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const TIME = 1000;
const EASE_OUT = 'cubic-bezier(.56, .56, .15, 1)';
const EASE_IN = 'cubic-bezier(1,-0.7,.29,.28)';
const EASE = 'cubic-bezier(.75,-0.5,0,1.75)';

export const styleRouteAnimation = `
  .home-enter,
  .home-exit,
  .view-home-enter,
  .view-home-exit,
  .view-view-enter,
  .view-view-exit {
    position: absolute;
  }

  .home-enter.home-enter-active,
  .home-exit.home-exit-active,
  .view-home-enter.view-home-enter-active,
  .view-home-exit.view-home-exit-active {
    transition: transform ${TIME}ms ${EASE};
  }

  .home-exit,
  .home-enter.home-enter-active,
  .view-home-exit,
  .view-home-enter.view-home-enter-active {
    transform: none;
  }

  .home-exit.home-exit-active,
  .home-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .view-home-exit.view-home-exit-active,
  .view-home-enter {
    transform: translate3d(100%, 0, 0);
  }




  .view-view-enter.view-view-enter-active .slide-bottom,
  .view-view-exit.view-view-exit-active .slide-bottom {
    transition: transform ${TIME}ms ${EASE};
  }

  .view-view-enter .slide-bottom {
    transform: translateY(100%);
  }

  .view-view-enter.view-view-enter-active .slide-bottom {
    transform: none;
  }

  .view-view-exit .slide-bottom {
    transform: translateY(0);
  }

  .view-view-exit.view-view-exit-active .slide-bottom {
    transform: translateY(-100%);
  }
`;

const Animation = props => (
  <CSSTransition
    {...props}
    timeout={TIME}
  />
);

class RouteAnimation extends Component {
  constructor(props) {
    super(props);
    this.classNames = 'withHome';
    this.withHome = false;
    this.replaceClassName = this.replaceClassName.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.withHome = this.props.locationKey === '/' || newProps.locationKey === '/';
  }

  replaceClassName(div) {
    if (div.className.indexOf('home ') !== -1) {
      div.setAttribute('class', div.className.replace(/disabled/g, 'home'));
    } else if (this.withHome) {
      div.setAttribute('class', div.className.replace(/disabled/g, 'view-home'));
    } else {
      div.setAttribute('class', div.className.replace(/disabled/g, 'view-view'));
    }
  }

  render() {
    return (
      <StyledTransitionGroup>
        <Animation
          key={this.props.locationKey}
          classNames="disabled"
          onEnter={this.replaceClassName}
          onExit={this.replaceClassName}
          onEntering={this.replaceClassName}
          onExiting={this.replaceClassName}
          onEntered={this.replaceClassName}
          onExited={this.replaceClassName}
        >
          {this.props.children}
        </Animation>
      </StyledTransitionGroup>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  RouteAnimation.propTypes = {
    children: PropTypes.node,
    locationKey: PropTypes.string,
  };
}

RouteAnimation.defaultProps = {
  children: null,
  locationKey: '',
};

export default RouteAnimation;
