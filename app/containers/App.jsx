import React, { Component } from 'react';
import { css } from 'glamor';

import Homepage from './Homepage';

const style = css({
  background: '#555555',
  padding: 0,
  margin: 0,
  '@media(max-width: 300px)': {
  },
});

class App extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div {...style}>
      <Homepage />
    </div>);
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
