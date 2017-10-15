import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TeaserItem from './/TeaserItem';

class ListEntriesComponent extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.onLeft !== this.props.onLeft;
  }

  render() {
    return (<div className={this.props.className}>
      {this.props.entries.map(entry => (
        <TeaserItem
          key={`teaser-entry-${entry.id}`}
          entry={entry}
          onLeft={this.props.onLeft}
        />
      ))}
    </div>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  ListEntriesComponent.propTypes = {
    className: PropTypes.string,
    entries: PropTypes.arrayOf(PropTypes.object),
    // categories: PropTypes.shape(PropTypes.any),
    onLeft: PropTypes.bool,
  };
}

ListEntriesComponent.defaultProps = {
  className: '',
  entries: [],
  categories: {},
  onLeft: false,
};

const ListEntries = styled(ListEntriesComponent)`
  & .infos {
    // transform: translateX(${props => (props.onLeft ? '-200%' : 'inherit')});
  }
`;

export default ListEntries;
