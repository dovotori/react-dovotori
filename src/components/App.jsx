import React, { Component, Fragment } from "react";
import styled, { injectGlobal, ThemeProvider } from "styled-components";

import theme from "../themes/theme";
import RoutesContainer from "../containers/RoutesContainer";
import commonCss from "../themes/commonCss";
import HeaderContainer from "../containers/HeaderContainer";
import MenuContainer from "../containers/MenuContainer";
import Footer from "./Footer";

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
        <Fragment>
          <MenuContainer />
          <RoutesContainer />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
