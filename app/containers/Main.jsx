import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from '../containers/Home';
import View from '../containers/View';
// import NoRoute from '../containers/NoRoute';
import RouteTransition from '../components/RouteTransition';

class Main extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <Switch>
        <RouteTransition>
          <Route
            location={this.props.location}
            key={this.props.location.key}
            path={this.props.location.pathname}
            component={this.props.location.pathname === '/' ? Home : View}
          />
        </RouteTransition>
        {/*
        <Route exact path="/" component={Home} />
        <Route path="/view" component={View} />
        <Route component={NoRoute} />
        */}
      </Switch>
    );
  }
}

Main.propTypes = {
  location: PropTypes.element.isRequired,
};

Main.defaultProps = {
};

export default Main;
