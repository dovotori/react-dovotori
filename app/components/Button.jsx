import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import {
  primaryColor,
  mobileBreakPoint,
  grey,
} from '../constants/styleVariables';

const toRight = css.keyframes('toRight', {
  '0%': { transform: 'translateX(0%)' },
  '50%': { transform: 'translateX(100%)' },
  '51%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(0%)' },
});

const toLeft = css.keyframes('toLeft', {
  '0%': { transform: 'translateX(0%)' },
  '50%': { transform: 'translateX(-100%)' },
  '51%': { transform: 'translateX(100%)' },
  '100%': { transform: 'translateX(0%)' },
});

const toTop = css.keyframes('toTop', {
  '0%': { transform: 'translateY(0%)' },
  '50%': { transform: 'translateY(100%)' },
  '51%': { transform: 'translateY(-100%)' },
  '100%': { transform: 'translateY(0%)' },
});

const toBottom = css.keyframes('toBottom', {
  '0%': { transform: 'translateY(0%)' },
  '50%': { transform: 'translateY(-100%)' },
  '51%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0%)' },
});

const style = css({
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  margin: '20px auto',
  background: 'rgba(255,255,255,0.4)',
  padding: '10px 20px',
  minWidth: 250,
  border: 0,
  cursor: 'pointer',
  color: grey,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
  ':hover': {
    '& .bottom': { animation: `${toRight} 400ms ease-out` },
    '& .top': { animation: `${toLeft} 200ms ease-out` },
    '& .left': { animation: `${toTop} 600ms ease-out` },
    '& .right': { animation: `${toBottom} 500ms ease-out` },
  },
  '& .anim': {
    position: 'absolute',
    background: primaryColor,
  },
  '& .top, & .bottom': {
    left: 0,
    height: 1,
    width: '100%',
  },
  '& .left, & .right': {
    top: 0,
    width: 1,
    height: '100%',
  },
  '& .bottom': { bottom: 0 },
  '& .top': { top: 0 },
  '& .left': { left: 0 },
  '& .right': { right: 0 },
  [`@media(max-width: ${mobileBreakPoint}px)`]: {
  },
});

class Button extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <button
        {...style}
      >
        {this.props.label}
        <span className="anim top" />
        <span className="anim bottom" />
        <span className="anim left" />
        <span className="anim right" />
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
};

Button.defaultProps = {
  label: '',
};

export default Button;
