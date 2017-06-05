import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';

import Routes from '../containers/Routes';
import Header from '../containers/Header';
import SvgDisplayer from '../components/SvgDisplayer';
import commonCss from '../themes/commonCss';

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss}`;
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (<div>
      <SvgDisplayer />
      <Header />
      <Routes location={this.props.location} />
    </div>);
  }
}

App.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

App.defaultProps = {
};

export default App;
