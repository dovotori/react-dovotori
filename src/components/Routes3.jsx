import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import TransitionRoute from "./TransitionRoute";
import ChangeRoute from "./ChangeRoute";

const Empty = props => props.children || null;

import Home from "./Home";
import Projects from "./Projects";
import ProjectContainer from "../containers/ProjectContainer";
import Cv from "./Cv";
import ButtonBack from "./ButtonBack";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/projects",
    component: Projects,
    exact: true
  },
  {
    path: "/cv",
    component: Cv,
    exact: true
  },
  {
    path: "/:slug",
    component: ProjectContainer,
    exact: false
  }
];

const EmptyComponent = () => <Empty />;

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    return (
      <Empty>
        <TransitionRoute names="translate" timeout={1000}>
          {routes.map(route => (
            <Route
              path={route.path}
              exact={route.exact}
              key={`route-${route.path}`}
              component={route.component}
            />
          ))}
        </TransitionRoute>
        {/* <TransitionRoute>
          <Route path="/" exact component={EmptyComponent} />
          <Route component={ButtonBack} />
        </TransitionRoute> */}
        {/* <Route component={ChangeRoute} /> */}
      </Empty>
    );
  }
}

export default Routes;
