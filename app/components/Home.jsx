import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Teaser from './Teaser';
import { Bloc } from './AnimatedRoute';
import StaggeredScale from './StaggeredScale';

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
    const items = entries.map((teaser, idx) => ({
      data: <Teaser key={teaser.id} entry={teaser} idx={idx} />,
      key: `teaser-${teaser.id}`,
    }));
    return (
      <StyledHome>
        <ListTeasers>
          <StaggeredScale
            items={items}
            in
            mode="TRANSLATE-LEFT"
            motion={{ stiffness: 500, damping: 40 }}
          />
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
