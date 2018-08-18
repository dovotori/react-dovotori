import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Svg from "./Svg";
import Overline from "./Overline";

const Styled = styled.div.attrs({
  className: "button-picto"
})`
  a {
    position: relative;
    display: block;
    margin: 5px 10px 5px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    transition: box-shadow 300ms ease-out, transform 300ms ease-out;
    text-decoration: none;
  }

  svg.icone {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    fill: ${p => p.theme.primary};
    width: 24px;
    height: 16px;
  }

  svg.losange {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${p => p.theme.dark};
    stroke: ${p => p.theme.primary};
    stroke-width: 0.4;
    max-width: 100%;
    width: 40px;
    height: 40px;
  }

  span {
    position: absolute;
    top: 120%;
    left: 40%;
    color: ${p => p.theme.dark};
    background-color: ${p => p.theme.primary};
    transition: transform 300ms ease-out, opacity 300ms ease-out;
    transform-origin: 0 0;
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }

  &:hover {
    span {
      transform: none;
      opacity: 1;
    }

    svg.icone {
      fill: ${p => p.theme.dark};
    }

    svg.losange {
      fill: ${p => p.theme.primary};
    }
  }
`;

class ButtonPicto extends Component {
  shouldComponentUpdate(newProps) {
    return this.props.link !== newProps.link;
  }

  render() {
    return this.props.link ? (
      <Styled aria-label={this.props.text}>
        <Link to={this.props.link}>
          <Overline>{this.props.text}</Overline>
          <Svg className="losange" useid="losange" />
          <Svg className="icone" useid={this.props.useid} />
        </Link>
      </Styled>
    ) : null;
  }
}

if (process.env.NODE_ENV !== "production") {
  ButtonPicto.propTypes = {
    text: PropTypes.string,
    link: PropTypes.string,
    useid: PropTypes.string.isRequired
  };
}

ButtonPicto.defaultProps = {
  text: "",
  link: ""
};

export default ButtonPicto;
