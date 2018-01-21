import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Cv extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <h1>Cv</h1>;
  }
}

if (process.env.NODE_ENV !== "production") {
  Cv.propTypes = {};
}

Cv.defaultProps = {};

export default Cv;
