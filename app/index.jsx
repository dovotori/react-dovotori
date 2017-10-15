/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './themes/theme';
import configureStore from './store/configureStore';
import App from './containers/App';
import { SetupServiceWorker } from './utils/SetupServiceWorker';

__webpack_nonce__ = 'dovotori-assets';

const store = configureStore();
const domElement = document.getElementById('dovotori-app');

if (process.env.NODE_ENV === 'production') {
  SetupServiceWorker();
}

const render = (Component) => {
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
    domElement,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(NextApp);
  });
}
