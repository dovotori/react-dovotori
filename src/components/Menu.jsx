import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SocialLinks from "./SocialLinks";

const StyledMenu = styled.div.attrs({
  className: "menu"
})``;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.dark};
  z-index: ${p => p.theme.zindex.menu};
  transition: transform 300ms ease-out;
  transform: ${p => (p.show ? "none" : "translateX(100%)")};

  ${p => p.theme.media.mobile`
    display: none;
  `};
`;

const WrapSocial = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  background: ${p => p.theme.gradient};
  z-index: ${p => p.theme.zindex.menu + 1};
  transition: transform 600ms ease-out;
  transform: ${p =>
    p.show ? "translateY(-50%)" : "translate3d(100%, -50%, 0)"};

  ${p => p.theme.media.mobile`
    top: 0;
    height: 100%;
    transform: ${p => (p.show ? "none" : "translateX(100%)")};
  `};
`;

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isMenuOpened, isTouchDevice } = this.props;
    return (
      <StyledMenu>
        <Background show={isMenuOpened} />
        <WrapSocial show={isMenuOpened}>
          <SocialLinks in={isMenuOpened} isTouchDevice={isTouchDevice} />
        </WrapSocial>
      </StyledMenu>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Menu.propTypes = {};
}

Menu.defaultProps = {};

export default Menu;
