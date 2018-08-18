import React, { Component } from "react";
import { injectGlobal, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

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

const Wrap = styled.div`
  height: 100%;
  ${p => p.theme.scrollbar};
`;

class App extends Component {
  componentWillMount() {
    injectGlobal`${commonCss}`;

    if (process.env.NODE_ENV !== "production") {
      console.log(
        "%c Hello JS Coders! ",
        `background: ${theme.primary}; color: #000`
      );
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrap>
          <SvgDisplayer />
          <LogoContainer />
          <MenuContainer />
          <Router>
            <Routes />
          </Router>
        </Wrap>
      </ThemeProvider>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  App.propTypes = {};
}

App.defaultProps = {};

export default App;
