/* global document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import ProjectContainer from "../containers/ProjectContainer";
import Cv from "./Cv";
import ButtonBack from "./ButtonBack";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/cv",
    component: Cv,
    exact: true,
  },
  {
    path: "/:slug",
    component: ProjectContainer,
    exact: false,
  },
];

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {routes.map(route => (
          <Route
            path={route.path}
            exact={route.exact}
            key={`route-${route.path}`}
            render={props => (
              <route.component
                {...props}
                key={`route-component-${route.path}`}
              />
            )}
          />
        ))}
        <Switch>
          <Route path="/" exact />
          <Route component={ButtonBack} />
        </Switch>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Routes.propTypes = {};
}

Routes.defaultProps = {};

export default Routes;
