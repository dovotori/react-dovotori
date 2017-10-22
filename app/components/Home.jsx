import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AnimatedBackground from './AnimatedBackground';
import Signature from './Signature';
import CenterToPage from './CenterToPage';
import Teaser from './Teaser';

const Styled = styled.div`
background: ${p => p.theme.grey};
`;

const ListTeasers = styled.div`
  text-align: center;
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { entries } = this.props;
    return (
      <div>
        <Styled>
          <CenterToPage>
            <Signature />
            <AnimatedBackground />
          </CenterToPage>
        </Styled>
        <ListTeasers>
          {
            entries.map(teaser => (<Teaser
              key={teaser.id}
              entry={teaser}
            />))
          }
        </ListTeasers>
      </div>
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
