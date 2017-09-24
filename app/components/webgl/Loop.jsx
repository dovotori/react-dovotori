/* global windows, document */
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';


class Loop extends Component {
  constructor(props) {
    super(props);

    this.state = { toggle: true };

    this.animationLoop = this.animationLoop.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.animationLoop);
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.toggle !== this.state.props;
  }

  animationLoop() {
    this.setState(prev => ({ toggle: !prev.toggle }));
    window.requestAnimationFrame(this.animationLoop);
  }

  render() {
    const { gl } = this.context;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    return Children.map(this.props.children,
      (child) => cloneElement(child, {
        toggle: this.state.toggle
      })
    );
  }
}

Loop.propTypes = {
  children: PropTypes.node,
};

Loop.defaultProps = {
  children: null,
};

Loop.contextTypes = {
  gl: PropTypes.object,
};

export default Loop;
