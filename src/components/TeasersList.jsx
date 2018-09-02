import React, { Component } from "react";
import styled from "styled-components";

import Teaser from "./Teaser";
import TeaserMobile from "./TeaserMobile";
import FadeUp from "./FadeUp";

const Wrap = styled.div.attrs({
  className: "teasers-list"
})``;

class TeasersList extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { entries, isTouchDevice } = this.props;
    return (
      <Wrap>
        {isTouchDevice ? (
          entries.map((teaser, idx) => (
            <TeaserMobile key={teaser.id} entry={teaser} idx={idx + 1} />
          ))
        ) : (
          <FadeUp>
            {entries.map((teaser, idx) => (
              <Teaser key={teaser.id} entry={teaser} idx={idx + 1} />
            ))}
          </FadeUp>
        )}
      </Wrap>
    );
  }
}

export default TeasersList;
