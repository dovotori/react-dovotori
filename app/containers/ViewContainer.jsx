import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from '../components/View';

class ViewContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <View {...this.props} />;
  }
}

const getEntry = (entries, slug) => (
  entries.filter(entry => (entry.slug === slug))
);

const mapStateToProps = (state, props) => {
  const slug = props.match.params.slug;
  return {
    entry: getEntry(state.entries, slug)[0],
  };
};

export default connect(mapStateToProps)(ViewContainer);
