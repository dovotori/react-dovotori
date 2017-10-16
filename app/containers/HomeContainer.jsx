import React, { Component } from 'react';

import Home from '../components/Home';

class HomeContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<Home />);
  }
}

if (process.env.NODE_ENV !== 'production') {
  HomeContainer.propTypes = {
  };
}

HomeContainer.defaultProps = {
};

export default HomeContainer;
