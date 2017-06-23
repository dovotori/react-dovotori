import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Title from '../components/Title';
import { withMainColumn } from '../components/hoc';

class View extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Title>{this.props.entry.title}</Title>
      <p>{this.props.entry.description}</p>
    </div>);
  }
}

View.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.number,
    tags: PropTypes.array,
    date: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};

View.defaultProps = {
};

const getEntry = (entries, slug) => (
  entries.filter(entry => (entry.slug === slug))
);

const mapStateToProps = (state, ownProps) => {
  const slug = (ownProps.match.params.slug);
  return ({
    entry: getEntry(state.entries, slug)[0],
  });
};

export default compose(
  connect(mapStateToProps),
  withMainColumn,
)(View);
