
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import ViewContainer from '../containers/ViewContainer';

const Wrap = styled.div.attrs({
  className: 'wrap',
}) `
  position: relative;
  width: 100%;
  height: calc(100% - 101px);
  bottom: 0;
  background: url('../assets/img/stripes.png') #fff repeat;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  @media screen and (max-width: ${p => p.theme.breakPoint}px) {
    height: auto;
  }
`;


const Bloc = styled.div.attrs({
  className: 'bloc',
}) `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
`;

class MotionRoute extends Component {
  static applyStyle(style) {
    return {
      transform: `translateX(${style.x * 100}%)`,
    };
  }

  shouldComponentUpdate(newProps) {
    return newProps.location.pathname !== this.props.location.pathname;
  }

  render() {
    const { pathname } = this.props.location;
    const motion = { stiffness: 80, damping: 12 };
    const isHome = pathname === '/';
    const items = [];
    if (isHome) {
      items.push({
        key: 'home',
        component: <HomeContainer />,
      });
    } else {
      items.push({
        key: 'view',
        component: <Route path="/view/:slug" component={ViewContainer} />,
      });
    }

    const styles = items.map(item => ({
      key: item.key,
      style: { x: spring(0, motion) },
      data: item.component,
    }));

    return (
      <TransitionMotion
        willEnter={() => ({ x: isHome ? -1 : 1 })}
        willLeave={() => ({ x: spring(isHome ? 1 : -1, motion) })}
        styles={styles}
      >
        {interpolatedStyles => (
          <Wrap>
            {interpolatedStyles.map(config => (
              <Bloc
                key={config.key}
                style={MotionRoute.applyStyle(config.style)}
              >
                {config.data}
              </Bloc>
            ))}
          </Wrap>
        )}
      </TransitionMotion>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  MotionRoute.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };
}

MotionRoute.defaultProps = {
};

export default withRouter(MotionRoute);