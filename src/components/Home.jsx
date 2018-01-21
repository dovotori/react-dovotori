import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Bloc from "./Bloc";
import ListTeasersContainer from "../containers/ListTeasersContainer";

const StyledHome = styled(Bloc).attrs({
  className: "home",
})``;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StyledHome>
        <ListTeasersContainer />
      </StyledHome>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Home.propTypes = {};
}

Home.defaultProps = {};

export default Home;
