import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TypingMessage from "./TypingMessage";
import Bloc from "./Bloc";
import LazyImage from "./LazyImage";
import Overline from "./Overline";

const TEXT_WIDTH = 700;

const Styled = styled(Bloc).attrs({
  className: "view"
})`
  // position: absolute;
  // top: 0;
  // left: 0;
`;

const WrapTexte = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 50%;

  ${p => p.theme.media.tablet`
    position: relative;
  `};
`;

const Hidden = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

const H1 = styled.h1.attrs({
  className: "slide-bottom"
})`
  // width: 50%;
  // color: ${p => p.theme.dark};
  width: 82%;
  max-width: ${TEXT_WIDTH}px;
  text-align: center;
  font-size: 3em;
  font-weight: 100;
  text-transform: lowercase;
  letter-spacing: 0.2em;
  margin: 10px auto;
  color: #fff;
  text-shadow: 2px -1px 0 ${p =>
    p.isprimary ? p.theme.primary : p.theme.secondary};
  padding: 20px 4%;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const Description = styled.div.attrs({
  className: "description"
})`
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.dark};
  width: 100%;
  background-color: #fff;
  line-height: 1.6;
  transform-origin: center top;
`;

const StyledTyping = styled(TypingMessage)`
  width: 82%;
  padding: 4%;
  max-width: ${TEXT_WIDTH}px;
  margin: 0 auto;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const ImagesList = styled.div.attrs({
  className: "images-list"
})`
  // position: absolute;
  // top: 0;
  // left: 50%;
  // float: left;
  // width: 50%;
  // height: 100%;
  // margin-left: 50%;
  max-width: ${p => p.theme.breakpoint.tablet}px;
  margin: 0 auto;
  // overflow-x: hidden;
  // overflow-y: auto;
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
  className: "images"
})``;

const StyledLazyImage = styled(LazyImage)`
  margin-bottom: 10px;
`;

const Date = styled.p.attrs({
  className: "date"
})`
  position: relative;
  z-index: 1;

  // transform: none !important;
  // top: auto;
  // left: auto;
  // width: auto;
  // overflow: visible;
  // text-align: center;
  // height: 0;
  // font-size: 1em;
  // text-shadow: none;
  // padding: 0;

  span {
    display: inline-block;
    background-color: ${p =>
      p.isprimary ? p.theme.primary : p.theme.secondary};
    color: ${p => p.theme.dark};
  }
`;

class View extends Component {
  shouldComponentUpdate(newProps) {
    return (
      newProps.entry.slug !== this.props.entry.slug ||
      newProps.x !== this.props.x
    );
  }

  render() {
    const {
      slug,
      title,
      description,
      images,
      category,
      date
    } = this.props.entry;
    const { x, key, isTouchDevice } = this.props;
    const isprimary = category === 0;

    return (
      <Styled key={key}>
        <WrapTexte>
          <Hidden isprimary={isprimary}>
            <H1
              isprimary={isprimary}
              style={{ transform: `translateY(${x * 100}%)` }}
            >
              {title}
            </H1>
          </Hidden>
          <Date
            // style={{
            //   transform: `rotate(-90deg) translateY(-100%) translateX(-${(1 -
            //     x) *
            //     100}%)`,
            //   opacity: 1 - x,
            // }}
            isprimary={isprimary}
          >
            <Overline>{date}</Overline>
          </Date>
          <Description style={{ transform: `scaleY(${1 - x})` }}>
            <StyledTyping
              message={description}
              cursorSize={8}
              disabled={isTouchDevice}
            />
          </Description>
        </WrapTexte>
        <ImagesList>
          {images && (
            <Images style={{ transform: `translateX(${x * 100}%)` }}>
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
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  View.propTypes = {
    entry: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.number,
      category: PropTypes.number,
      date: PropTypes.number
    }),
    key: PropTypes.string,
    x: PropTypes.number,
    isTouchDevice: PropTypes.bool
  };
}

View.defaultProps = {
  entry: {},
  key: "",
  x: 0,
  isTouchDevice: false
};

export default View;
