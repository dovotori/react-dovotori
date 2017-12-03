
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { HashRouter as Router, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

import theme from '../themes/theme';
import Structure from '../components/Structure';
import commonCss from '../themes/commonCss';

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss}`;
    console.log('%c Hello JS Coders! ', `background: ${theme.primary}; color: #000`);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route component={Structure} />
        </Router>
      </ThemeProvider>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  App.propTypes = {
    // dispatch: PropTypes.func,
  };
}

App.defaultProps = {
  // dispatch: null,
};


// export default connect()(App);
export default App;
