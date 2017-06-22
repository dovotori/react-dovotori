import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ListEntries from '../components/ListEntries';
import { withMainColumn } from '../components/hoc';

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <ListEntries
        entries={this.props.entries}
        categories={this.props.categories}
      />
    </div>);
  }
}

Home.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.objectOf(PropTypes.string),
};

Home.defaultProps = {
  entries: [],
  categories: {},
};

const mapStateToProps = state => ({
  entries: state.entries,
  categories: state.categories,
});

export default compose(
  connect(mapStateToProps),
  withMainColumn,
)(Home);
