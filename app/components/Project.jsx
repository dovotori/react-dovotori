import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Title from '../components/Title';
import Description from '../components/Description';
import Bullet from '../components/Bullet';

class ProjectComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div className={this.props.className}>
      <Title>{this.props.title}</Title>
      <Bullet />
      <Description>{this.props.description}</Description>
      <Bullet />
    </div>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  ProjectComponent.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };
}

ProjectComponent.defaultProps = {
  className: '',
  title: '',
  description: '',
};

const Project = styled(ProjectComponent)`
  border: solid 30px rgba(255,255,255,0.4);
  background: ${props => props.theme.lightgrey};
  padding: 30px;
  box-shadow: 10px 10px 20px 10px #aaa;
`;

export default Project;