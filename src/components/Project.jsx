import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Bloc from "./Bloc";
import LazyImage from "./LazyImage";
import Overline from "./Overline";

const TEXT_WIDTH = 700;

const StyledProject = styled(Bloc).attrs({
  className: "project",
})`
  padding: 10% 0;
`;

const WrapContent = styled.div.attrs({
  className: "wrap-content",
})`
  margin: 0 auto;
  max-width: ${p => p.theme.breakpoint.tablet}px;
`;

const WrapTexte = styled.div``;

const Hidden = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

const H1 = styled.h1.attrs({
  className: "slide-bottom",
})`
  text-align: left;
  font-size: 3em;
  font-weight: 100;
  color: #fff;
  text-shadow: 2px -1px 0 ${p => (p.isprimary ? p.theme.primaryDark : p.theme.secondaryDark)};
  overflow-wrap: break-word;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0;
  padding: 0;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const Description = styled.div.attrs({
  className: "description",
})`
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.dark};
  width: 100%;
  margin: 0 auto 10px;
  line-height: 1.6;
  transform-origin: center top;
`;

const Text = styled.p`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  max-width: ${TEXT_WIDTH}px;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const ImagesList = styled.div.attrs({
  className: "images-list",
})`
  margin: 0 auto;
  ${p => p.theme.scrollbar} img {
    display: block;
    width: 100%;
  }

  ${p => p.theme.media.tablet`
    position: relative;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    height: auto;
    left: auto;
  `};
`;

const Images = styled.div.attrs({
  className: "images",
})``;

const StyledLazyImage = styled(LazyImage)`
  margin-bottom: 10px;
  background: ${p => p.theme.mild};
`;

const Date = styled.p.attrs({
  className: "date",
})`
  position: relative;
  z-index: 1;
  text-align: left;

  span {
    display: inline-block;
    background-color: ${p =>
      p.isprimary ? p.theme.primary : p.theme.secondary};
    color: ${p => p.theme.dark};
  }
`;

class Project extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      slug,
      title,
      description,
      images,
      category,
      date,
    } = this.props.entry;
    const { isTouchDevice } = this.props;
    const isprimary = category === 0;

    return (
      <StyledProject>
        <WrapContent>
          <div className="anim-content">
            <WrapTexte>
              <Hidden isprimary={isprimary}>
                <H1 isprimary={isprimary}>{title}</H1>
              </Hidden>
              <Date isprimary={isprimary}>
                <Overline>{date}</Overline>
              </Date>
              <Description>
                <Text>{description}</Text>
              </Description>
            </WrapTexte>
            <ImagesList>
              {images && (
                <Images>
                  {Array(images)
                    .fill()
                    .map((_, idx) => (
                      <StyledLazyImage
                        src={`./assets/img/${slug}/${slug}-${idx}.jpg`}
                        key={`image-${slug}-${idx}`}
                      />
                    ))}
                </Images>
              )}
            </ImagesList>
          </div>
        </WrapContent>
      </StyledProject>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Project.propTypes = {
    entry: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.number,
      category: PropTypes.number,
      date: PropTypes.number,
    }),
    isTouchDevice: PropTypes.bool,
  };
}

Project.defaultProps = {
  entries: null,
  isTouchDevice: false,
};

export default Project;
