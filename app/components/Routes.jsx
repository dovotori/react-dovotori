import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import MotionRoutes from './MotionRoutes';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import Signature from './Signature';
import Interaction from './Interaction';
class Routes extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.location.pathname !== this.props.location.pathname;
  }

  render() {
    // const locationKey = this.props.location.pathname;
    return (
      <Interaction>
        <Header location={this.props.location} />
        <Signature />
        <AnimatedBackground />
        <MotionRoutes />
        <Footer />
      </Interaction>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Routes.propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
  };
}

Routes.defaultProps = {};

export default Routes;
