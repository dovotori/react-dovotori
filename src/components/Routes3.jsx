import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import TransitionRoute from "./TransitionRoute";

const Empty = styled.div`
  display: none;
`;

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

const EmptyComponent = () => <Empty />;

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <TransitionRoute>
          {routes.map(route => (
            <Route
              path={route.path}
              exact={route.exact}
              key={`route-${route.path}`}
              component={route.component}
            />
          ))}
        </TransitionRoute>
        <TransitionRoute>
          <Route path="/" exact component={EmptyComponent} />
          <Route component={ButtonBack} />
        </TransitionRoute>
      </div>
    );
  }
}

export default Routes;
