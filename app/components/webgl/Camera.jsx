import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Vec3 from '../geometry/Vec3.js';
import Mat4 from '../geometry/Mat4.js';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.cible = new Vec3(0, 0, 0);

    this.view = new Mat4();
    this.projection = new Mat4();
  }

  componentWillMount() {
    this.lookAt();
    this.perspective();
  }

  lookAt() {
    const { position } = this.props;

    this.view.identity();
    this.view.lookAt(
      position[0], position[1], position[2],
      this.cible.x, this.cible.y, this.cible.z,
      0, 1, 0
    );
  }

  perspective() {
    const { width, height, angle, far, near } = this.props;
    this.projection.identity();
    this.projection.perspective(angle, width / height, near, far);
  }

  render() {
    this.lookAt();
    this.perspective();
    return Children.map(this.props.children,
      (child) => cloneElement(child, {
        view: this.view.get(),
        projection: this.projection.get(),
      })
    );
  }
}

Camera.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
  position: PropTypes.array,
  angle: PropTypes.number,
  far: PropTypes.number,
  near: PropTypes.number,
};

Camera.defaultProps = {
  children: null,
  width: 100,
  height: 100,
  position: [-10, 0, 0],
  angle: 50,
  far: 100,
  near: 1,
};

Camera.contextTypes = {
  gl: PropTypes.object,
};

export default Camera;
