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

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss}`;
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
        <div>
          <BrowserRouter>
            <Route component={Routes} />
          </BrowserRouter>
          <Header />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  App.propTypes = {
    // location: PropTypes.shape({
    //   hash: PropTypes.string,
    //   key: PropTypes.string,
    //   pathname: PropTypes.string,
    //   search: PropTypes.string,
    //   state: PropTypes.string,
    // }).isRequired,
  };
}

App.defaultProps = {
};

export default App;
