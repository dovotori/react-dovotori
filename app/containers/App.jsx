/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

import SvgDisplayer from '../components/SvgDisplayer';
import theme from '../themes/theme';
import Routes from '../components/Routes';
import commonCss from '../themes/commonCss';
import Interaction from '../components/Interaction';
// import { detectTouch } from '../actions';

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss}`;
    console.log('%c Hello JS Coders! ', `background: ${theme.primary}; color: #000`);

    // window.addEventListener('touchstart', () => {
    //   alert('touch', window.navigator.userAgent);
    //   this.props.dispatch(detectTouch(false));
    // }, false);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Interaction>
          <SvgDisplayer />
          <BrowserRouter>
            <Route component={Routes} />
          </BrowserRouter>
        </Interaction>
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
