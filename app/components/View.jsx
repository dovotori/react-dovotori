import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TypingMessage from './TypingMessage';
import { Bloc } from './AnimatedRoute';

const Styled = styled(Bloc).attrs({
  className: 'view',
})`
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
})`
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
`;

const Description = styled.div.attrs({
  className: 'description',
})`
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.grey};
  width: 100%;
  background-color: #fff;
  line-height: 1.6;
  // border-bottom: solid 1px #aaa;
`;

const StyledTyping = styled(TypingMessage)`
  width: 50%;
  padding: 4%;

  @media screen and (max-width: ${p => p.theme.breakPoint}px) {
    width: 100%;
  }
`;

const ImagesList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  border-left: solid 1px #aaa;
  border-right: solid 1px #aaa;
  ${p => p.theme.scrollbar}

  img {
    display: block;
    width: 100%;
  }

  @media screen and (max-width: ${p => p.theme.breakPoint}px) {
    position: relative;
    width: 100%;
  }
`;

const Images = styled.div.attrs({
  className: 'images',
})`
`;

const Date = styled.p.attrs({
  className: 'date',
})`
  font-family: ${p => p.theme.font2};
  position: absolute;
  color: #aaa;
  top: 24px;
  left: 50%;
  transform: rotate(-90deg) translateY(-100%) translateX(-100%);
  transform-origin: 0 0;
  font-size: 1em;
  letter-spacing: 0.1em;

  span {
    display: block;
  }

  @media screen and (max-width: ${p => p.theme.breakPoint}px) {
    left: auto;
    right: 0;
    transform: translateX(100%) rotate(-90deg) translateY(-100%);
  }
`;

class View extends Component {
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
    const isprimary = category === 0;
    return (
      <Styled>
        <Date><span>{date}</span></Date>
        <Hidden isprimary={isprimary}>
          <H1 isprimary={isprimary}>
            {title}
          </H1>
        </Hidden>
        <Description>
          <StyledTyping message={description} cursorSize={8} />
        </Description>
        <ImagesList>
          {images && <Images>
            {Array(images).fill().map((x, idx) => (
              <img
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
  };
}

View.defaultProps = {
  entry: {},
};

export default View;
