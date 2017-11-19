import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ViewNavigation from '../components/ViewNavigation';

class ViewsContainer extends Component {
  shouldComponentUpdate(newProps) {
    console.log(newProps.location.pathname, this.props.location.pathname);
    return newProps.location.pathname !== this.props.location.pathname;
  }

  render() {
    const { nextSlug, previousSlug } = this.props;
    return <ViewNavigation nextSlug={nextSlug} previousSlug={previousSlug} />;
  }
}

if (process.env.NODE_ENV !== 'production') {
  ViewsContainer.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
  };
}

ViewsContainer.defaultProps = {
  nextSlug: null,
  previousSlug: null,
};

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
