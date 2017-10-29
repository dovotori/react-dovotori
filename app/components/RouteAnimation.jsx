import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

export const AnimComponent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  bottom: 0;
  height: 90%;
  background: url('../assets/img/stripes2.png') #fff repeat;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.5);
`;

const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const TIME = 1000;
const EASE_OUT = 'cubic-bezier(.56, .56, .15, 1)';
const EASE_IN = 'cubic-bezier(1,-0.7,.29,.28)';
const EASE = 'cubic-bezier(.75,-0.5,0,1.75)';

injectGlobal`
.route-enter,
.route-exit {
  position: absolute;
}

.route-enter.route-enter-active,
.route-exit.route-exit-active {
  transition: transform ${TIME}ms ${EASE};
}






.home.route-exit {
  transform: none;
}

.home.route-exit.route-exit-active {
  transform: translate3d(-100%, 0, 0);
}

.home.route-enter {
  transform: translate3d(-100%, 0, 0);
}

.home.route-enter.route-enter-active {
  transform: none;
}







.view.route-exit {
  transform: none;
}

.view.route-exit.route-exit-active {
  transform: translate3d(100%, 0, 0);
}

.view.route-enter {
  transform: translate3d(100%, 0, 0);
}

.view.route-enter.route-enter-active {
  transform: none;
}

`;

const Animation = props => (
  <CSSTransition {...props} classNames="route" timeout={1000} mountOnEnter unmountOnExit />
);

class RouteAnimation extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillReceiveProps(newProps) {
    const homeToView = this.props.locationKey === '/'
      && newProps.locationKey.indexOf('/view/') !== -1;
  }

  render() {
    return (
      <StyledTransitionGroup>
        <Animation
          key={this.props.locationKey}>
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
