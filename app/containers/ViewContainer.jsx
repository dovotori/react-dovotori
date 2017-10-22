import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from '../components/View';

class ViewContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<View {...this.props} />);
  }
}

const mapStateToProps = state => ({
  entries: state.entries,
});

export default connect(mapStateToProps)(ViewContainer);
