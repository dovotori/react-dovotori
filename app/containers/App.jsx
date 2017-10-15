import React, { Component } from 'react';
import { injectGlobal, withTheme } from 'styled-components';
import PropTypes from 'prop-types';

// import Routes from './Routes';
// import Navigation from './Navigation';
import HomeContainer from './HomeContainer';
// import SvgDisplayer from '../components/SvgDisplayer';
import commonCss from '../themes/commonCss';
import Header from '../components/Header';
import Footer from '../components/Footer';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    injectGlobal`${commonCss}`;
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentDidMount() {
    const { theme } = this.props;
    console.log('%c Hello JS Coders! ', `background: ${theme.primary}; color: #000`);
  }

  render() {
    return (<div>
      {/* <SvgDisplayer /> */}
      {/* <Routes location={this.props.location} /> */}
      <HomeContainer />
      <Header />
      <Footer />
    </div>);
  }
}

if (process.env.NODE_ENV !== 'production') {
  App.propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
  };
}

App.defaultProps = {
};

export default withTheme(App);
