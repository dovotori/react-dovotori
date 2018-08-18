import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Bloc from "./Bloc";
import Signature from "./Signature2";

const StyledHome = styled(Bloc).attrs({
  className: "home",
})`
  margin: 0 auto;
  padding: 10% 0;
`;

class Home extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StyledHome>
        {/* <Link to="/projects" /> */}
        <Signature />
      </StyledHome>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Home.propTypes = {};
}

Home.defaultProps = {};

export default Home;
