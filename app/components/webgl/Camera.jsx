import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Vec3 from '../geometry/Vec3.js';
import Mat4 from '../geometry/Mat4.js';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.position = new Vec3(0, 0, 2);
    this.cible = new Vec3(0, 0, 0);

    this.matIdentity = new Mat4();
    this.view = new Mat4();
    this.projection = new Mat4();

    this.far = 100.0;
    this.near = 1.0;

    this.angle = 60;

    this.cpt = 0;
  }

  componentDidMount() {
    this.matIdentity.identity();
    this.lookAt();
    this.perspective();
  }

  lookAt() {
    this.view.identity();
    this.view.lookAt(
      this.position.x, this.position.y, this.position.z,
      this.cible.x, this.cible.y, this.cible.z,
      0, 1, 0
    );
  }

  perspective() {
    const { width, height } = this.props;
    this.projection.identity();
    this.projection.perspective(this.angle, width / height, this.near, this.far);
  }

  render() {
    this.cpt++;
    this.matIdentity.identity();
    this.matIdentity.rotate(Math.cos(this.cpt * 0.004) * 360, 1,1,0);
    return Children.map(this.props.children,
      (child) => cloneElement(child, {
        model: this.matIdentity.get(),
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
};

Camera.defaultProps = {
  children: null,
  width: 100,
  height: 100,
};

Camera.contextTypes = {
  gl: PropTypes.object,
};

export default Camera;
