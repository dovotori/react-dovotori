import React, { Component } from "react";
import { injectGlobal, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import theme from "../themes/theme";
import Routes from "./Routes3";
import commonCss from "../themes/commonCss";
import HeaderContainer from "../containers/HeaderContainer";
import MenuContainer from "../containers/MenuContainer";
import LogoContainer from "../containers/LogoContainer";
import Footer from "./Footer";
// import AnimatedBackground from "./AnimatedBackground";
// import Signature from "./Signature";
import SvgDisplayer from "./SvgDisplayer";

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss}`;

    // Hello to developpers
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "%c Hello JS Coders! ",
        `background: ${theme.primary}; color: #000`,
      );
    }
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          {/*
          <Route path="/:slug*" component={HeaderContainer} />
          <Signature />
          <AnimatedBackground />
          <Route path="/:slug*" component={Routes} />
          <Footer /> */}
          <SvgDisplayer />
          <LogoContainer />
          <MenuContainer />
          <Router>
            <Routes />
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  App.propTypes = {};
}

App.defaultProps = {};

export default App;
