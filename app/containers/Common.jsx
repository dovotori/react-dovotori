import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListEntries from '../components/ListEntries';

class Common extends Component {
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

Common.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.objectOf(PropTypes.string),
};

Common.defaultProps = {
  entries: [],
  categories: {},
};

const mapStateToProps = state => ({
  entries: state.entries,
  categories: state.categories,
});

export default connect(mapStateToProps)(Common);
