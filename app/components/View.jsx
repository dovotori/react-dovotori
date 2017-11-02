import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ViewNavigation from './ViewNavigation';
import Line from './Line';
import TypingMessage from './TypingMessage';

const Styled = styled.div.attrs({
  className: 'view',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Wrap = styled.div`
  position: relative;
  height: calc(100% - 120px);
  width: 80%;
  margin: 60px auto;
`;

const Hidden = styled.div`
  position: relative;
  overflow: hidden;
`;

const H1 = styled.h1.attrs({
  className: 'slide-bottom',
})`
  width: 50%;
  text-align: center;
  font-size: 3em;
  font-weight: 100;
  letter-spacing: 0.04em;
  color: #fff;
  text-shadow: 2px -1px 0 ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  text-align: left;
  margin: 0;
`;

const Description = styled(TypingMessage)`
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.grey};
  padding: 4%;
  margin: 30px 0 0;
  width: 50%;
  background-color: #fff;
  line-height: 1.6;
`;

const ImagesList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  ${p => p.theme.scrollbar}

  img {
    display: block;
    width: 100%;
  }
`;

const BlankImagesList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${p => p.theme.grey};
  opacity: 0.5;
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
    } = this.props.entry;
    const { nextSlug, previousSlug } = this.props;
    const isprimary = category === 0;
    return (
      <Styled>
        <Wrap>
          <ViewNavigation
            nextSlug={nextSlug}
            previousSlug={previousSlug}
          />
          <Hidden>
            <H1 isprimary={isprimary}>
              {title}
            </H1>
            <Line hover isprimary={isprimary} time="6000" />
          </Hidden>
          <Description message={description} cursorSize={8} />
          {images ? <ImagesList>
            {Array(images).fill().map((x, idx) => (
              <img
                key={`image-${slug}-${idx}`}
                src={`../assets/img/${slug}/${slug}-${idx}.jpg`}
              />
            ))}
          </ImagesList>: <BlankImagesList />}
        </Wrap>
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
    }),
    nextSlug: PropTypes.string,
    previousSlug: PropTypes.string,
  };
}

View.defaultProps = {
  entry: {},
  previousSlug: null,
  nextSlug: null,
};

export default View;
