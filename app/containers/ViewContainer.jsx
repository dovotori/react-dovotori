import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from '../components/View';

class ViewContainer extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.location.pathname !== this.props.location.pathname;
  }

  render() {
    return <View {...this.props} />;
  }
}

if (process.env.NODE_ENV !== 'production') {
  ViewContainer.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };
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
