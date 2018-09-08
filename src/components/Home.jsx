import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Bloc from "./Bloc";
import Signature from "./Signature";
import TeasersListContainer from "../containers/TeasersListContainer";

const StyledHome = styled(Bloc)`
  margin: 0 auto;
  padding: 60vh 0;
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StyledHome>
        <Signature />
        <TeasersListContainer />
      </StyledHome>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Home.propTypes = {};
}

Home.defaultProps = {};

export default Home;
