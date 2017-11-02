import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import theme from '../themes/theme';
import Routes from './Routes';
// import Navigation from './Navigation';
// import SvgDisplayer from '../components/SvgDisplayer';
import commonCss from '../themes/commonCss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import Signature from '../components/Signature';
import ResizeWatcher from '../components/ResizeWatcher';
import { styleRouteAnimation } from '../components/RouteAnimation';

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss} ${styleRouteAnimation}`;
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentDidMount() {
    console.log('%c Hello JS Coders! ', `background: ${theme.primary}; color: #000`);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ResizeWatcher>
          <Signature />
          <AnimatedBackground />
          <BrowserRouter>
            <Route component={Routes} />
          </BrowserRouter>
          <Header />
          <Footer />
        </ResizeWatcher>
      </ThemeProvider>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  App.propTypes = {
  };
}

App.defaultProps = {};

export default App;
