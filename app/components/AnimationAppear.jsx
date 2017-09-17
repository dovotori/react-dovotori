import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  perspective: 1000px;
`;

const Styled = styled.div`
  transform: translateZ(${p => p.isScale ? 0 : '1000px'});
  opacity: ${p => p.isScale ? 1 : 0};
  transition: transform 2s, opacity 2s;
`;

class AnimationAppear extends Component {
  constructor(props) {
    super(props);
    this.state = { scale: false };
  }

  componentDidMount() {
    this.setState({ scale: true });
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.scale !== this.state.scale;
  }

  render() {
    return (<Wrap>
      <Styled isScale={this.state.scale}>
        {this.props.children}
      </Styled>
    </Wrap>);
  }
}

AnimationAppear.propTypes = {
  children: PropTypes.node,
};

AnimationAppear.defaultProps = {
  children: null,
};

export default AnimationAppear;
