/* globals window */
import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';

import Routes from './Routes';
import Header from '../components/Header';
import Common from './Common';
import SvgDisplayer from '../components/SvgDisplayer';
import commonCss from '../themes/commonCss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  componentWillMount() {
    injectGlobal`${commonCss}`;
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const x = ((this.state.x / window.innerWidth) - 0.5) * 10;
    const y = ((this.state.y / window.innerHeight) - 0.5) * 10;
    return (<div
      onMouseMove={(e) => { this.setState({ x: e.clientX, y: e.clientY }); }}
      style={{
        transform: `rotateY(${x}deg) rotateX(${y}deg)`
        + ` translateX(${-x}px) translateY(${-y}px)`,
        height: '100%',
      }}
    >
      <SvgDisplayer />
      <Header />
      <Common />
      <Routes location={this.props.location} />
    </div>);
  }
}

App.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

App.defaultProps = {
};

export default App;
