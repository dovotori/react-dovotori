import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const Animation = (props) => {
  console.log(props);
  return (
    <CSSTransition
      {...props}
      classNames="fadeTranslate"
      timeout={1000}
      mountOnEnter
      unmountOnExit
    />
  );
};

const RouteAnimation = props => (
  <TransitionGroup>
    <Animation
      key={props.locationKey}
    >
      {props.children}
    </Animation>
  </TransitionGroup>
);

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
