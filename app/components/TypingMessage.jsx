/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cursor from './Cursor';

class TypingMessage extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.anim = this.anim.bind(this);
    this.restart = this.restart.bind(this);

    this.tempTx = null;
    this.cptLetter = 0;
    this.div = null;
    this.time = 0;
    this.isBackward = false;
  }

  componentWillMount() { }

  componentDidMount() {
    this.start();
  }

  shouldComponentUpdate(newProps) {
    return this.props.message !== newProps.message;
  }

  componentDidUpdate() {
    this.start();
  }

  start() {
    this.tempTxt = '';
    this.cptLetter = 0;
    this.time = Date.now();
    window.requestAnimationFrame(this.anim);
  }

  restart() {
    if (this.props.nextCallTime !== null) {
      this.isBackward = !this.isBackward;
      this.start();
    }
  }

  anim() {
    const { message, intervalLetter, nextCallTime } = this.props;
    if (this.cptLetter < message.length) {
      if (this.div) {
        const time = Date.now();
        if (time - this.time > intervalLetter) {
          if (this.isBackward) {
            this.tempTxt = message.substr(0, message.length - 1 - this.cptLetter);
          } else {
            this.tempTxt += message.charAt(this.cptLetter);
          }
          this.div.innerHTML = this.tempTxt;
          this.cptLetter += 1;
          this.time = Date.now();
        }
      }
      window.requestAnimationFrame(this.anim);
    } else {
      if (this.isBackward) {
        this.div.innerHTML = '';
      } else {
        this.div.innerHTML = message;
      }
      window.setTimeout(this.restart, nextCallTime);
    }
  }

  render() {
    return (
      <p className={`${this.props.className} message`}>
        <span ref={d => (this.div = d)} />
        <Cursor color={this.props.color} size={this.props.cursorSize} />
      </p>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  TypingMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    intervalLetter: PropTypes.number,
    nextCallTime: PropTypes.number,
    cursorSize: PropTypes.number,
    color: PropTypes.string,
  };
}

TypingMessage.defaultProps = {
  className: '',
  message: '',
  intervalLetter: 10,
  nextCallTime: null,
  cursorSize: 6,
  color: '#000',
};

export default TypingMessage;
