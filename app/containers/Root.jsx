import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from '../themes/theme';
import configureStore from '../store/configureStore';
import App from './App';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Route
              render={({ location }) => (
                <App location={location} />
              )}
            />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Root;
