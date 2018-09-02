import React, { Component } from "react";
import styled from "styled-components";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import TransitionRoute from "./TransitionRoute";

import routes from "../constants/routes";

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location, isTouchDevice } = this.props;
    const items = routes.map(route => (
      <Route
        path={route.path}
        exact={route.exact}
        key={`route-${route.path}`}
        component={route.component}
      />
    ));
    return (
      <Router>
        {isTouchDevice ? (
          <Switch location={location}>{items}</Switch>
        ) : (
          <TransitionRoute>{items}</TransitionRoute>
        )}
      </Router>
    );
  }
}

export default Routes;
