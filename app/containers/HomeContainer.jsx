import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import ListEntries from '../components/ListEntries';
import { withColumn } from '../components/withColumn';

import CenterToPage from '../components/CenterToPage';
import InteractionFloating from '../components/InteractionFloating';
import AnimationAppear from '../components/AnimationAppear';
import Signature from '../components/Signature';
import Home from '../components/Home';

class HomeContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      {/* <CenterToPage>
        <AnimationAppear>
          <InteractionFloating>
            <Signature />
          </InteractionFloating>
        </AnimationAppear>
      </CenterToPage> */}
      <Home />
    </div>);
  }
}

HomeContainer.propTypes = {
  // entries: PropTypes.arrayOf(PropTypes.object),
  // categories: PropTypes.objectOf(PropTypes.string),
};

HomeContainer.defaultProps = {
  // entries: [],
  // categories: {},
};

const mapStateToProps = state => ({
  // entries: state.entries,
  // categories: state.categories,
});

export default connect(mapStateToProps)(HomeContainer);

