/* global document */
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import App from "./components/App";
import SetupServiceWorker from "./utils/SetupServiceWorker";
import configureStore from "./store/configureStore";

const store = configureStore();

// __webpack_nonce__ = 'dovotori-assets';

if (process.env.NODE_ENV === "production") {
  SetupServiceWorker();
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("dovotori-app"),
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
