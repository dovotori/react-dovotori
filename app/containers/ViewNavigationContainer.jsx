import React, { Component } from 'react';
import { connect } from 'react-redux';

import ViewNavigation from '../components/ViewNavigation';

class ViewsContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <ViewNavigation {...this.props} />;
  }
}

const getNextSlug = (entries, idx) => (
  idx < entries.length - 1 ? entries[idx + 1].slug : null
);

const getPreviousSlug = (entries, idx) => (
  idx > 0 ? entries[idx - 1].slug : null
);

const mapStateToProps = (state, props) => {
  const slug = props.match.params.slug;
  const idx = state.entries.findIndex(i => i.slug === slug);
  return {
    previousSlug: getPreviousSlug(state.entries, idx),
    nextSlug: getNextSlug(state.entries, idx),
  };
};

export default connect(mapStateToProps)(ViewsContainer);
