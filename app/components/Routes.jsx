import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HomeContainer from '../containers/HomeContainer';
import ViewContainer from '../containers/ViewContainer';
import AnimatedRoute from './AnimatedRoute';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import Signature from './Signature';

class Routes extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.location.pathname !== this.props.location.pathname;
  }

  render() {
    const locationKey = this.props.location.pathname;
    return (
      <div style={{ height: '100%' }}>
        <Header location={this.props.location} />
        <Signature />
        <AnimatedBackground />
        <AnimatedRoute
          locationKey={locationKey}
        >
          <Switch location={this.props.location}>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/view/:slug" component={ViewContainer} />
          </Switch>
        </AnimatedRoute>
        <Footer />
      </div>
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
