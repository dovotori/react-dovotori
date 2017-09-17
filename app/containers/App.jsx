import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';

import Routes from './Routes';
import Navigation from './Navigation';
import HomeContainer from './HomeContainer';
import SvgDisplayer from '../components/SvgDisplayer';
import commonCss from '../themes/commonCss';
import Header from '../components/Header';
import Footer from '../components/Footer';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    injectGlobal`${commonCss}`;
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (<div>
      <SvgDisplayer />
      {/* <Routes location={this.props.location} /> */}
      <HomeContainer />
      <Header />
      <Footer />
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
