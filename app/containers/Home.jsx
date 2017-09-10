import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import ListEntries from '../components/ListEntries';
import { withMainColumn } from '../components/hoc';

import CenterToPage from '../components/CenterToPage';
import InteractionFloating from '../components/InteractionFloating';
import AnimationAppear from '../components/AnimationAppear';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Signature from '../components/Signature';

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Logo />
      <CenterToPage>
        <AnimationAppear>
          <InteractionFloating>
            <Signature />
          </InteractionFloating>
        </AnimationAppear>
      </CenterToPage>
      <Footer />
    </div>);
  }
}

Home.propTypes = {
  // entries: PropTypes.arrayOf(PropTypes.object),
  // categories: PropTypes.objectOf(PropTypes.string),
};

Home.defaultProps = {
  // entries: [],
  // categories: {},
};

const mapStateToProps = state => ({
  // entries: state.entries,
  // categories: state.categories,
});

export default compose(
  connect(mapStateToProps),
)(Home);
