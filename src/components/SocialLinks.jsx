import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css, withTheme } from "styled-components";

import WrapperTooltip from "./WrapperTooltip";
import Staggered from "./Staggered";
import Svg from "./Svg";

const StyledStaggered = styled(Staggered)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;

  ${p => p.theme.media.mobile`
    flex-direction: column;
  `};
`;

const StyledSvg = styled(Svg)`
  width: 60px;
  height: 60px;
  display: inline-block;
  fill: #fff;
  margin: 0 60px;
  transform: none;
  opacity: ${p => (p.disabled ? 1 : 0.8)};
  transition: transform 300ms ${p => p.theme.elastic2},
    opacity 300ms ${p => p.theme.elastic2};

  &:hover {
    opacity: 1;
    transform: scale(1.6);
  }
`;

const Tooltip = styled(WrapperTooltip).attrs({
  className: "with-tooltip",
})`
  position: relative;
  padding-bottom: 30px;

  .message {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translateX(-50%);

    span {
      color: #fff;
      // color: ${p => p.theme.dark};
      letter-spacing: 0.15em;
      font-size: 0.7em;
      font-weight: 100;
    }
  }

  ${p => p.theme.media.mobile`
    margin-bottom: 60px;
  `};
`;

const A = styled.a`
  display: block;
`;

class SocialLinks extends Component {
  shouldComponentUpdate(newProps) {
    return this.props.in !== newProps.in;
  }

  render() {
    const { isTouchDevice } = this.props;
    const items = [
      {
        key: "réseautage",
        data: (
          <Tooltip message="réseautage" disabled={isTouchDevice}>
            <A href="http://fr.linkedin.com/pub/dorian-ratovo/95/a9a/636">
              <StyledSvg useid="linkedin" disabled={isTouchDevice} />
            </A>
          </Tooltip>
        ),
      },
      {
        key: "code is law",
        data: (
          <Tooltip message="code is law" disabled={isTouchDevice}>
            <A href="https://github.com/dovotori">
              <StyledSvg useid="github" disabled={isTouchDevice} />
            </A>
          </Tooltip>
        ),
      },
      {
        key: "konnichi wa",
        data: (
          <Tooltip message="konnichi wa" disabled={isTouchDevice}>
            <A href="mailto:mailto:dorian.r@openmailbox.org">
              <StyledSvg useid="mail" disabled={isTouchDevice} />
            </A>
          </Tooltip>
        ),
      },
    ];

    return (
      <StyledStaggered
        className={this.props.className}
        items={items}
        in={this.props.in}
        // wrapperStyle={wrapperStyle}
        mode="TRANSLATE-LEFT"
        motion={this.props.theme.motion}
      />
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  SocialLinks.propTypes = {
    in: PropTypes.bool,
    isTouchDevice: PropTypes.bool,
    className: PropTypes.string,
  };
}

SocialLinks.defaultProps = {
  in: false,
  isTouchDevice: false,
  className: "",
};

export default withTheme(SocialLinks);
