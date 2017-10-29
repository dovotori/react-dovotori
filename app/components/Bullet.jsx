import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class BulletComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className={this.props.className} />;
  }
}

if (process.env.NODE_ENV !== 'production') {
  BulletComponent.propTypes = {
    className: PropTypes.string,
  };
}

BulletComponent.defaultProps = {
  className: '',
};

const Bullet = styled(BulletComponent)`
  width: 10px;
  height: 10px;
  border: solid 1px ${props => props.theme.primary};
  margin: 30px auto;
  transform: rotate(45deg);
`;

export default Bullet;
