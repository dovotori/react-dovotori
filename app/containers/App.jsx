import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';

import Main from '../containers/Main';
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
    console.log(this.props.location);
    return (<div>
      <SvgDisplayer />
      <Header />
      <Main location={this.props.location} />
    </div>);
  }
}

App.propTypes = {
  location: PropTypes.element.isRequired,
};

App.defaultProps = {
};

export default App;
