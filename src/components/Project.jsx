import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LazyImage from "./LazyImage";
import Loader from "./Loader";
import ButtonBack from "./ButtonBack";
import Bloc from "./Bloc";
import { getProjectImagePath } from "../utils";

const TEXT_WIDTH = 700;

const StyledProject = styled(Bloc)`
  padding: 10% 0;
`;

const WrapContent = styled.div`
  margin: 0 auto;
  max-width: ${p => p.theme.breakpoint.tablet}px;
`;

const WrapTexte = styled.div``;

const Title = styled.h1`
  text-align: left;
  font-size: 5em;
  font-weight: 100;
  color: #fff;
  text-shadow: 0.2rem 0.2rem 0
    ${p => (p.isprimary ? p.theme.primaryDark : p.theme.secondaryDark)};
  overflow-wrap: break-word;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 1rem 0;
  padding: 0;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const Description = styled.div`
  text-align: left;
  font-size: 1em;
  color: ${p => p.theme.dark};
  width: 100%;
  margin: 1rem 0;
  line-height: 1.4;
  padding: 20px;
  background-color: #fff;
  max-width: ${TEXT_WIDTH}px;

  ${p => p.theme.media.tablet`
    width: 100%;
  `};
`;

const ImagesList = styled.div`
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

const Images = styled.div``;

const StyledLazyImage = styled(LazyImage)`
  margin: 10px 0;
  min-height: 100px;
`;

const StyledLoader = styled(Loader)``;

const Date = styled.p`
  text-align: left;
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  margin: 0;
  padding: 0.4rem 0.2rem 0.4rem 0.4rem;
  background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  color: ${p => p.theme.dark};
  font-family: monospace;
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
      date
    } = this.props.entry;
    const { isTouchDevice } = this.props;
    const isprimary = category === 0;

    return (
      <StyledProject>
        <WrapContent>
          <WrapTexte>
            <Title isprimary={isprimary}>{title}</Title>
            <Date isprimary={isprimary}>{date}</Date>
            <Description>{description}</Description>
          </WrapTexte>
          <ImagesList>
            {images && (
              <Images>
                {Array(images)
                  .fill()
                  .map((_, idx) => (
                    <StyledLazyImage
                      src={getProjectImagePath(slug, idx)}
                      key={`image-${slug}-${idx}`}
                    >
                      <Loader />
                    </StyledLazyImage>
                  ))}
              </Images>
            )}
          </ImagesList>
          <ButtonBack />
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
      date: PropTypes.number
    }),
    isTouchDevice: PropTypes.bool
  };
}

Project.defaultProps = {
  entries: null,
  isTouchDevice: false
};

export default Project;
