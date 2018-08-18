import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";

import Teaser from "./Teaser";
import Bloc from "./Bloc";
import Staggered from "./Staggered";

const Wrap = styled.div.attrs({
  className: "teasers-list wrap-content"
})`
  max-width: 400px;
  margin: 0 auto;
`;

class TeasersList extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { entries, isTouchDevice, theme } = this.props;
    const items = entries.map((teaser, idx) => ({
      data: (
        <Teaser
          key={teaser.id}
          entry={teaser}
          idx={idx}
          noHover={isTouchDevice}
        />
      ),
      key: `teaser-${teaser.id}`
    }));
    return (
      <Wrap>
        <div className="anim-content">
          {/* <Staggered
          items={items}
          in
          mode="TRANSLATE-RIGHT"
          motion={theme.motion}
          opacity
        /> */}
          {entries.map((teaser, idx) => (
            <Teaser
              key={teaser.id}
              entry={teaser}
              idx={idx}
              noHover={isTouchDevice}
            />
          ))}
        </div>
      </Wrap>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  TeasersList.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape),
    isTouchDevice: PropTypes.bool
  };
}

TeasersList.defaultProps = {
  entries: [],
  isTouchDevice: false
};

export default withTheme(TeasersList);
