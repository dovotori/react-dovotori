import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListEntries from './ListEntries';
import Logo from './Logo';

class HeaderComponent extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.onLeft !== this.props.onLeft;
  }

  render() {
    const { entries, categories, onLeft } = this.props;
    return (
      <div className={this.props.className}>
        <ListEntries
          entries={entries}
          categories={categories}
          onLeft={onLeft}
        />
        <Logo
          onLeft={onLeft}
        />
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  className: PropTypes.string,
  entries: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.objectOf(PropTypes.string),
  onLeft: PropTypes.bool,
};

HeaderComponent.defaultProps = {
  className: '',
  entries: [],
  categories: {},
  onLeft: false,
};

const Header = styled(HeaderComponent)`
  position: absolute;
  z-index: 3;
  width: 100%;
  // transition: transform 300ms ease-out;
  // transform: ${props => (props.slided ? 'scale(0.5) translateX(-100%)' : 'none')};
`;

export default Header;
