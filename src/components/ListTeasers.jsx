import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";

import Teaser from "./Teaser";
import Bloc from "./Bloc";
import Staggered from "./Staggered";

const Wrap = styled.div.attrs({
  className: "list-teasers",
})`
  margin: 10% 0;
`;

class ListTeasers extends Component {
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
      key: `teaser-${teaser.id}`,
    }));
    return (
      <Wrap>
        <Staggered
          items={items}
          in
          mode="TRANSLATE-RIGHT"
          motion={theme.motion}
          opacity
        />
      </Wrap>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  ListTeasers.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape),
    isTouchDevice: PropTypes.bool,
  };
}

ListTeasers.defaultProps = {
  entries: [],
  isTouchDevice: false,
};

export default withTheme(ListTeasers);
