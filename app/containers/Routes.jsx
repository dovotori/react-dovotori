import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RouteTransition } from 'react-router-transition';

import Home from '../containers/Home';
import View from '../containers/View';
import Error from '../containers/Error';

const Routes = (props) => {
  const { location } = props;
  return (
    <RouteTransition
      pathname={location.pathname}
      atEnter={{
        x: 1000,
        o: 0,
      }}
      atLeave={{
        x: -1000,
        o: 0,
      }}
      atActive={{
        x: 0,
        o: 1,
      }}
      mapStyles={styles => ({
        transform: `perspective(1000px) translateZ(${styles.x}px)`,
        opacity: styles.o,
      })}
      className="route-transition"
    >
      <Switch key={location.pathname} location={location}>
        <Route exact path="/" component={Home} />
        <Route path="/view/:slug" component={View} />
        <Route component={Error} />
      </Switch>
    </RouteTransition>
  );
};

Routes.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

Routes.defaultProps = {
};

export default Routes;
