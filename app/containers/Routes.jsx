import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RouteTransition } from 'react-router-transition';

import Home from '../containers/Home';
import View from '../containers/View';
import Error from '../containers/Error';
// import RouteTransition from '../components/RouteTransition';

class Routes extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const { location } = this.props;
    return (
      <RouteTransition
        pathname={location.pathname}
        atEnter={{ translateX: 100 }}
        atLeave={{ translateX: -100 }}
        atActive={{ translateX: 0 }}
        mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
      >
        <Switch key={location.pathname} location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/view" component={View} />
          <Route component={Error} />
        </Switch>
      </RouteTransition>
    );
  }
}

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
