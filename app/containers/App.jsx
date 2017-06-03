import React, { Component } from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';

import Homepage from './Homepage';
import SvgDisplayer from '../components/SvgDisplayer';
import mainTheme from '../themes/main';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`;

class App extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (<div>
      <SvgDisplayer />
      <ThemeProvider theme={mainTheme}>
        <Homepage />
      </ThemeProvider>
    </div>);
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
