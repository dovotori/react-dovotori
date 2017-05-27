import React, { Component } from 'react';

import Button from '../components/Button';

class App extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div>
      <Button label="btn 1" />
      <h1>Welcome</h1>
      <Button label="btn 2" />
    </div>);
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
