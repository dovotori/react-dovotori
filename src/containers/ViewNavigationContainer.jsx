import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ViewNavigation from "../components/ViewNavigation";

class ViewNavigationContainer extends Component {
  shouldComponentUpdate(newProps) {
    return (
      newProps.pathname !== this.props.pathname ||
      newProps.menuOpened !== this.props.menuOpened ||
      this.props.nextSlug !== newProps.nextSlug ||
      this.props.previousSlug !== newProps.previousSlug
    );
  }

  render() {
    const { nextSlug, previousSlug, pathname, menuOpened } = this.props;
    return (
      <ViewNavigation
        nextSlug={nextSlug}
        previousSlug={previousSlug}
        pathname={pathname}
        menuOpened={menuOpened}
      />
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  ViewNavigationContainer.propTypes = {
    pathname: PropTypes.string,
    slug: PropTypes.string,
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
    menuOpened: PropTypes.bool
  };
}

ViewNavigationContainer.defaultProps = {
  nextSlug: null,
  previousSlug: null,
  menuOpened: true,
  slug: null,
  pathname: null
};

const getNextSlug = (entries, idx) =>
  idx < entries.length - 1 ? entries[idx + 1].slug : null;

const getPreviousSlug = (entries, idx) =>
  idx > 0 ? entries[idx - 1].slug : null;

const mapStateToProps = (state, props) => {
  if (props.slug) {
    const idx = state.content.entries.findIndex(i => i.slug === props.slug);
    return {
      previousSlug: getPreviousSlug(state.content.entries, idx),
      nextSlug: getNextSlug(state.content.entries, idx)
    };
  }
  return {};
};

export default connect(mapStateToProps)(ViewNavigationContainer);
