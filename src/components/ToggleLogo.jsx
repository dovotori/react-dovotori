import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Svg from "./Svg";
import SvgAnimation from "./SvgAnimation";

const Button = styled.button.attrs({
  className: "toggle-logo",
})`
  position: fixed;
  z-index: ${p => p.theme.zindex.logo};
  bottom: 20px;
  left: 20px;
`;

const StyledSvg = styled(Svg)`
  width: 40px;
  height: 40px;

  fill: #fff;
  // stroke: ${p => p.theme.dark};
  color: ${p => p.theme.primary};
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
    const useid = this.props.isMenuOpened ? "cross" : "logo";
    const onClick = this.props.isMenuOpened ? this.close : this.open;
    return (
      <Button onClick={onClick}>
        <StyledSvg key={useid} useid={useid} />
      </Button>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  ToggleLogo.propTypes = {
    className: PropTypes.string,
    isMenuOpened: PropTypes.bool,
  };
}

ToggleLogo.defaultProps = {
  isMenuOpened: false,
  className: "",
};

export default ToggleLogo;
