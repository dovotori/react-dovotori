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

const getNextSlug = (entries, idx) => (
  idx < entries.length - 1 ? entries[idx + 1].slug : null
);

const getPreviousSlug = (entries, idx) => (
  idx > 0 ? entries[idx - 1].slug : null
);

const getEntry = (entries, slug) => (
  entries.filter(entry => (entry.slug === slug))
);

const mapStateToProps = (state, props) => {
  const slug = props.match.params.slug;
  const idx = state.entries.findIndex(i => i.slug === slug);
  return {
    entry: getEntry(state.entries, slug)[0],
    previousSlug: getPreviousSlug(state.entries, idx),
    nextSlug: getNextSlug(state.entries, idx),
  };
};

export default connect(mapStateToProps)(ViewContainer);
