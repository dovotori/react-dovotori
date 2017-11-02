import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Teaser from './Teaser';

const StyledHome = styled.div.attrs({
  className: 'home',
})`
`;

const ListTeasers = styled.div.attrs({
  className: 'list-teasers',
})`
  margin: 4%;
  text-align: center;
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { entries } = this.props;
    // console.log(this.props);
    return (
      <StyledHome>
        <ListTeasers>
          {entries.map(teaser => <Teaser key={teaser.id} entry={teaser} />)}
        </ListTeasers>
      </StyledHome>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Home.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape),
  };
}

Home.defaultProps = {
  entries: [],
};

export default Home;
