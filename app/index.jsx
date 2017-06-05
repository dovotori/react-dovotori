/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './themes/main';
import configureStore from './store/configureStore';

// import reducers from './reducers';
import App from './containers/App';

const store = configureStore();

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update'); // eslint-disable-line

//   whyDidYouUpdate(React);
// }

ReactDOM.render(
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
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
