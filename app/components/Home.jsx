import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Teaser from './Teaser';
import { Bloc } from './AnimatedRoute';

const StyledHome = styled(Bloc).attrs({
  className: 'home',
})`
  ${p => p.theme.scrollbar}
`;

const ListTeasers = styled.div.attrs({
  className: 'list-teasers',
})`
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
          {entries.map((teaser, idx) => <Teaser key={teaser.id} entry={teaser} idx={idx} />)}
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
