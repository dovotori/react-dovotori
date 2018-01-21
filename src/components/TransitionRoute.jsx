import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, withRouter } from "react-router-dom";

class TransitionRoute extends Component {
  render() {
    const { location } = this.props;
    return (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={1000}>
          <Switch location={location}>{this.props.children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  TransitionRoute.propTypes = {
    children: PropTypes.node,
  };
}

TransitionRoute.defaultProps = {
  children: null,
};

export default withRouter(TransitionRoute);
