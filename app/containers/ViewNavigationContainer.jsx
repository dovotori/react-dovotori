import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import ViewNavigation from '../components/ViewNavigation';

class ViewNavigationContainer extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.location.pathname !== this.props.location.pathname
      || newProps.menuOpened !== this.props.menuOpened
      || this.props.nextSlug !== newProps.nextSlug
      || this.props.previousSlug !== newProps.previousSlug;
  }

  render() {
    const { nextSlug, previousSlug, location, menuOpened } = this.props;
    return (<ViewNavigation
      nextSlug={nextSlug}
      previousSlug={previousSlug}
      pathname={location.pathname}
      menuOpened={menuOpened}
    />);
  }
}

if (process.env.NODE_ENV !== 'production') {
  ViewNavigationContainer.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
    menuOpened: PropTypes.bool,
  };
}

ViewNavigationContainer.defaultProps = {
  nextSlug: null,
  previousSlug: null,
  menuOpened: true,
};

const getNextSlug = (entries, idx) => (
  idx < entries.length - 1 ? entries[idx + 1].slug : null
);

const getPreviousSlug = (entries, idx) => (
  idx > 0 ? entries[idx - 1].slug : null
);

const mapStateToProps = (state, props) => {
  const { pathname } = props.location;
  if (pathname.indexOf('/view/') !== -1) {
    const slug = props.location.pathname.replace('/view/', '');
    const idx = state.entries.findIndex(i => i.slug === slug);
    return {
      previousSlug: getPreviousSlug(state.entries, idx),
      nextSlug: getNextSlug(state.entries, idx),
    };
  }
  return {};
};

export default compose(
  withRouter,
  connect(mapStateToProps),
)(ViewNavigationContainer);
