import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const Styled = styled(CSSTransition)`
  &.fade-appear {
    opacity: 0.01;
  }

  &.fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }

  &.fade-enter {
    opacity: 0.01;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 800ms ease-in;
  }
`;

class Transition extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    setInterval(() => {
      this.setState({ show: !this.state.show });
    }, 5000);
  }
  render() {
    console.log(this.state.show);
    return (
      <Styled in={this.state.show} timeout={1000} classNames="fade">
        {this.props.children}
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Transition.propTypes = {
    children: PropTypes.node,
  };
}

Transition.defaultProps = {
  children: null,
};

export default Transition;
