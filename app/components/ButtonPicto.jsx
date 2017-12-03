import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Svg from './Svg';


const Styled = styled.div.attrs({
  className: 'button-picto',
}) `
a {
  position: relative;
  display: block;
  margin: 5px 10px 5px;
  width: 35px;
  height: 35px;
  // border-radius: 50%;
  background-color: transparent;
  transition: box-shadow 300ms ease-out, transform 300ms ease-out;
  text-decoration: none;
  // box-shadow: 2px 0 0 ${p => p.theme.primary};
  // border: solid 1px ${p => p.theme.primary};
  // transform: translateX(0);
}

svg.icone,
svg.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  // transition: transform 300ms ease-out;
}

svg.circle {
  display: none;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: ${p => p.theme.primary};
  stroke-width: 0.4;
}

svg.icone {
  fill: rgba(0,0,0,0);
  stroke: ${p => p.theme.primary};
  stroke-width: 1;
  height: 20px;
  max-width: 100%;
  transition: fill 300ms ease-out;
}

span {
  position: absolute;
  top: 120%;
  left: 40%;
  font-size: 0.7em;
  color: ${p => p.theme.grey};
  background-color: ${p => p.theme.primary};
  transition: transform 300ms ease-out, opacity 300ms ease-out;
  transform-origin: 0 0;
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
  letter-spacing: 0.1em;
  padding: 0 2px;
  box-shadow: 1px 1px 0 ${p => p.theme.grey};
}

&:hover {
  a {
    // transform: translateX(2px);
  }

  span {
    transform: none;
    opacity: 1;
  }

  svg.icone {
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
      <Styled>
        <Link to={this.props.link}>
          <span>{this.props.text}</span>
          <Svg className="icone" useid={this.props.useid} />
          <Svg className="circle" useid="circle" />
        </Link>
      </Styled>
    ) : null;
  }
}

if (process.env.NODE_ENV !== 'production') {
  ButtonPicto.propTypes = {
    text: PropTypes.string,
    link: PropTypes.string,
    useid: PropTypes.string.isRequired,
  };
}

ButtonPicto.defaultProps = {
  text: '',
  link: '',
};

export default ButtonPicto;
