import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Bloc from "./Bloc";
import TeasersListContainer from "../containers/TeasersListContainer";

const StyledProjects = styled(Bloc).attrs({
  className: "projects",
}) `
  margin: 0 auto;
  padding: 10% 0;
`;

class Projects extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StyledProjects>
        <TeasersListContainer />
      </StyledProjects>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Projects.propTypes = {};
}

Projects.defaultProps = {};

export default Projects;
