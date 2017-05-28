import React, { Component } from 'react';
import { css } from 'glamor';

import Homepage from './Homepage';
import SvgDisplayer from '../components/SvgDisplayer';

const style = css({
  fontFamily: '"nimbus-sans", Helvetica, Arial, "Helvetica Neue", Geneva, sans-serif',
  fontWeight: 'light',
  background: '#999999',
  padding: 0,
  margin: 0,
  textAlign: 'center',
  '@media(max-width: 300px)': {
  },
});

class App extends Component {
  componentWillMount() {
    // css.global('html, body', { padding: 0 });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div {...style}>
      <SvgDisplayer />
      <Homepage />
    </div>);
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
