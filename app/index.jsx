/* global document */
import 'core-js/es6/map';
import 'core-js/es6/set';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './themes/theme';
import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Route
              render={({ location }) => (
                <Component location={location} />
              )}
            />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('dovotori-app')
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App) });
}
