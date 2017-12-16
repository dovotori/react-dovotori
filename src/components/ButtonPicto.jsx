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
  width: 16px;
  height: 16px;
}

svg.losange {
  position: absolute;
  top: 0;
  left: 0;
  fill: none;
  stroke: ${p => p.theme.primary};
  stroke-width: .4;
  max-width: 100%;
  width: 40px;
  height: 40px;
}

p {
  position: absolute;
  top: 120%;
  left: 40%;
  font-size: 0.8em;
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
  p {
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
          <p>{this.props.text}</p>
          <Svg className="losange" useid="losange" width={40} height={40} />
          <Svg className="icone" useid={this.props.useid} width={16} height={16} />
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
