import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeContainer from './HomeContainer';
import ViewContainer from './ViewContainer';
import AnimatedRoute from '../components/AnimatedRoute';

class Routes extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.location.pathname !== this.props.location.pathname;
  }

  render() {
    const locationKey = this.props.location.pathname;
    return (
      <AnimatedRoute
        locationKey={locationKey}
        callback={this.callbackEnter}
      >
        <Switch location={this.props.location}>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/view/:slug" component={ViewContainer} />
        </Switch>
      </AnimatedRoute>
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
