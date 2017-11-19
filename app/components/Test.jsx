import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Motion, spring } from 'react-motion';

import TransitionScale from './TransitionScale';
import HandlerScale from './HandlerScale';

const Box = styled.div`
margin: 20px;
background-color: #000;
width: 100px;
height: 100px;
`;

const wrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        // { key: 'a', size: 10 },
        // { key: 'b', size: 20 },
        // { key: 'c', size: 30 },
      ],
      items2: [
        { key: 'a', data: <Box />, in: true },
        { key: 'b', data: <Box />, in: true },
        { key: 'c', data: <Box />, in: true },
      ],
    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.isToggle = false;
    this.isToggle2 = false;
  }

  componentDidMount() {
    this.setState({
      items: [
        { key: 'a', data: <Box />, in: true },
        { key: 'b', data: <Box />, in: true },
        { key: 'c', data: <Box />, in: true },
      ],
    });
  }

  toggle() {
    if (!this.isToggle) {
      this.setState({
        items: [
          { key: 'a', data: <Box />, in: true },
          { key: 'b', data: <Box />, in: true },
        ], // remove c.
      });
    } else {
      this.setState({
        items: [
          { key: 'a', data: <Box />, in: true },
          { key: 'b', data: <Box />, in: true },
          { key: 'c', data: <Box />, in: true },
        ],
      });
    }
    this.isToggle = !this.isToggle;
  }

  toggle2() {
    if (!this.isToggle2) {
      this.setState({
        items2: [
          { key: 'a', data: <Box />, in: true },
          { key: 'b', data: <Box />, in: false },
          { key: 'c', data: <Box />, in: true },
        ],
      });
    } else {
      this.setState({
        items2: [
          { key: 'a', data: <Box />, in: true },
          { key: 'b', data: <Box />, in: true },
          { key: 'c', data: <Box />, in: true },
        ],
      });
    }
    this.isToggle2 = !this.isToggle2;
  }

  render() {
    return (
      <div>
        <TransitionScale
          items={this.state.items}
          wrapperStyle={wrapperStyle}
        />
        <HandlerScale
          items={this.state.items2}
          in={!this.isToggle}
          wrapperStyle={wrapperStyle}
        />
        <button onClick={this.toggle}>Toggle</button>
        <button onClick={this.toggle2}>Toggle2</button>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Test.propTypes = {
  };
}

Test.defaultProps = {
};

export default Test;
