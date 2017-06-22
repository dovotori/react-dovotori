import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TeaserItem from './/TeaserItem';

class ListEntriesComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div className={this.props.className}>
      {this.props.entries.map(entry => (
        <TeaserItem
          key={`teaser-entry-${entry.id}`}
          entry={entry}
        />
      ))}
    </div>);
  }
}

ListEntriesComponent.propTypes = {
  className: PropTypes.string,
  entries: PropTypes.arrayOf(PropTypes.object),
  // categories: PropTypes.shape(PropTypes.any),
};

ListEntriesComponent.defaultProps = {
  className: '',
  entries: [],
  categories: {},
};

const ListEntries = styled(ListEntriesComponent)`
`;

export default ListEntries;
