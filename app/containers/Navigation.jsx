import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Navigation extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <Header
        entries={this.props.entries}
        categories={this.props.categories}
        onLeft={this.props.onLeft}
      />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Navigation.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.objectOf(PropTypes.string),
    onLeft: PropTypes.bool,
  };
}

Navigation.defaultProps = {
  entries: [],
  categories: {},
  onLeft: false,
};

const mapStateToProps = state => ({
  entries: state.entries,
  categories: state.categories,
});

export default connect(mapStateToProps)(Navigation);
