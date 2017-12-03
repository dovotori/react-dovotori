import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TypingMessage from './TypingMessage';
import Bloc from './Bloc';

const Styled = styled(Bloc).attrs({
  className: 'view',
}) `
  position: absolute;
  top: 0;
  left: 0;
`;

const Hidden = styled.div`
  position: relative;
  overflow: hidden;
  // border-bottom: solid 1px #aaa;
  // border-top: solid 1px #aaa;
  z-index: 0;
`;

const H1 = styled.h1.attrs({
  className: 'slide-bottom',
}) `
  width: 50%;
  text-align: center;
  font-size: 3em;
  font-weight: 100;
  letter-spacing: 0.04em;
  color: ${p => p.theme.grey};
  text-shadow: 2px -1px 0 ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  // border-bottom: solid 1px ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  text-align: left;
  margin: 0;
  padding: 0 4%;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const Description = styled.div.attrs({
  className: 'description',
}) `
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.grey};
  width: 100%;
  background-color: #fff;
  line-height: 1.6;
  // border-bottom: solid 1px #aaa;
`;

const StyledTyping = styled(TypingMessage) `
  width: 50%;
  padding: 4%;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const ImagesList = styled.div.attrs({
  className: 'images-list',
}) `
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  max-width: ${p => p.theme.breakpoint.tablet}px;
  z-index: 1;
  border-left: solid 1px #ccc;
  // background-color: ${p => p.theme.grey};
  overflow-x: hidden;
  overflow-y: auto;
  ${p => p.theme.scrollbar}

  img {
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
  `}
`;

const Images = styled.div.attrs({
  className: 'images',
}) `
`;

const Date = styled.p.attrs({
  className: 'date',
}) `
  font-family: ${p => p.theme.font2};
  position: absolute;
  color: #aaa;
  top: 0px;
  left: 50%;
  transform: rotate(-90deg) translateY(-100%) translateX(-100%);
  transform-origin: 0 0;
  font-size: 2em;
  letter-spacing: 0.1em;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  text-shadow: 1px 1px 0 #fff;
  padding: 4px;

  span {
    display: block;
  }

  ${p => p.theme.media.tablet`
    position: relative;
    transform: none!important;
    // display: block;
    top: auto;
    left: auto;
    width: auto;
    overflow: visible;
    z-index: 1;
    text-align: right;
    height: 0;
    font-size: 1em;
    text-shadow: none;
    padding: 0;

    span {
      display: inline-block;
      background-color: ${p.isprimary ? p.theme.primary : p.theme.secondary};
      color: ${p.theme.grey};
      padding: 2px 2px 0;
      transform: translateY(-50%);
    }
  `};
`;

class View extends Component {
  shouldComponentUpdate(newProps) {
    return newProps.entry.slug !== this.props.entry.slug
      || newProps.x !== this.props.x;
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
    const { x, key, isTouchDevice } = this.props;
    const isprimary = category === 0;

    return (
      <Styled key={key}>
        <Hidden isprimary={isprimary}>
          <H1
            isprimary={isprimary}
            style={{ transform: `translateY(${x * 100}%)` }}
          >
            {title}
          </H1>
        </Hidden>
        <Date
          style={{
            transform: `rotate(-90deg) translateY(-100%) translateX(-${((1 - x) * 100)}%)`,
            opacity: 1 - x,
          }}
          isprimary={isprimary}
        >
          <span>{date}</span>
        </Date>
        <Description
          style={{ transform: `scaleY(${1 - x})` }}
        >
          <StyledTyping
            message={description}
            cursorSize={8}
            disabled={isTouchDevice}
          />
        </Description>
        <ImagesList>
          {images && <Images
            style={{ transform: `translateX(${x * 100}%)` }}
          >
            {Array(images).fill().map((_, idx) => (
              <img
                alt="."
                key={`image-${slug}-${idx}`}
                src={`../assets/img/${slug}/${slug}-${idx}.jpg`}
              />
            ))}
          </Images>}
        </ImagesList>
      </Styled>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  View.propTypes = {
    entry: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.number,
      category: PropTypes.number,
      date: PropTypes.number,
    }),
    key: PropTypes.string,
    x: PropTypes.number,
    isTouchDevice: PropTypes.bool,
  };
}

View.defaultProps = {
  entry: {},
  key: '',
  x: 0,
  isTouchDevice: false,
};

export default View;
