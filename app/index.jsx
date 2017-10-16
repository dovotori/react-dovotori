/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';
import { SetupServiceWorker } from './utils/SetupServiceWorker';

__webpack_nonce__ = 'dovotori-assets';

const domElement = document.getElementById('dovotori-app');

if (process.env.NODE_ENV === 'production') {
  SetupServiceWorker();
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
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
