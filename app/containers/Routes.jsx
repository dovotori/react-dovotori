import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomeContainer from '../containers/HomeContainer';
import View from '../containers/View';
import Error from '../containers/Error';

const Routes = (props) => {
  const { location } = props;
  return (<div>
    <Switch key={location.pathname} location={location}>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/view/:slug" component={View} />
      <Route component={Error} />
    </Switch>
  </div>);
};

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

Routes.defaultProps = {
};

export default Routes;
