import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';


class HomeContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = state => ({
  entries: state.entries,
});

export default connect(mapStateToProps)(HomeContainer);
