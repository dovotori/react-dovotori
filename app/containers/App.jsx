import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from '../themes/theme';
// import Routes from './Routes';
// import Navigation from './Navigation';
import HomeContainer from './HomeContainer';
// import SvgDisplayer from '../components/SvgDisplayer';
import commonCss from '../themes/commonCss';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import configureStore from '../store/configureStore';

// const store = configureStore();

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

  componentDidMount() {
    console.log('%c Hello JS Coders! ', `background: ${theme.primary}; color: #000`);
  }

  render() {
    return (
      // <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <BrowserRouter>
            <Route
              render={({ location }) => (
                <HomeContainer />
              )}
            />
          </BrowserRouter>
          <Header />
          <Footer />
        </div>
      </ThemeProvider>
      // </Provider>
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
