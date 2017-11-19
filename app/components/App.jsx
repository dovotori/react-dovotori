import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import SvgDisplayer from './SvgDisplayer';
import theme from '../themes/theme';
import Routes from './Routes';
import commonCss from '../themes/commonCss';
import Interaction from './Interaction';
import { styleRouteAnimation } from './AnimatedRoute';

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss} ${styleRouteAnimation}`;
    console.log('%c Hello JS Coders! ', `background: ${theme.primary}; color: #000`);
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
  };
}

App.defaultProps = {};

export default App;
