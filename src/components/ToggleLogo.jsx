import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Svg from "./Svg";
import SvgAnimation from "./SvgAnimation";

const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${p => p.theme.dark};
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: 0;
  }

  &:hover {
    box-shadow: -2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;

const Icon = styled(Svg)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  fill: ${p => p.theme.light};
  color: ${p => p.theme.primary};
  opacity: ${p => (p.in ? 1 : 0)};
  transition: transform 300ms ease-out, opacity 300ms ease-out;
`;

const CrossIcon = Icon.extend`
  transform: translate3d(-50%, -50%, 0) ${p => (p.in ? "" : "rotate(90deg)")};
`;

const LogoIcon = Icon.extend`
  transform: translate3d(-50%, -50%, 0) ${p => (p.in ? "" : "rotate(-90deg)")};
`;

class ToggleLogo extends Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  shouldComponentUpdate(newProps, newState) {
    return (
      this.props.isMenuOpened !== newProps.isMenuOpened ||
      newState.over !== this.state.over
    );
  }

  open() {
    this.props.setMenu(true);
  }

  close() {
    this.props.setMenu(false);
  }

  render() {
    const { isMenuOpened, className } = this.props;
    return (
      <Button
        className={className}
        onClick={isMenuOpened ? this.close : this.open}
      >
        <CrossIcon useid={"cross"} in={isMenuOpened} />
        <LogoIcon useid={"logo"} in={!isMenuOpened} />
      </Button>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  ToggleLogo.propTypes = {
    className: PropTypes.string,
    isMenuOpened: PropTypes.bool
  };
}

ToggleLogo.defaultProps = {
  isMenuOpened: false,
  className: ""
};

export default ToggleLogo;
