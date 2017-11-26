import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OFFSET_X = 50;

const LINK = styled(Link).attrs({
  className: 'teaser',
}) `
  position: relative;
  display: block;
  text-decoration: none;
`;

const Banner = styled.div`
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 400px;
  // box-shadow: ${p => (p.hover ? '-4px 4px' : '-1px 1px')} 0 #aaa;
  // transition: box-shadow 300ms ease-out;
  max-width: 430px;
  margin: 0 auto;
  transition: transform 0.4s ease-out;
  transform: ${p => (p.hover ? `translateX(-${OFFSET_X}px)` : 'none')};
  // z-index: ${p => (p.hover ? 2 : 'auto')};

  ${p => p.theme.media.mobile`
    width: 100%;
    transform: none;
  `};
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
`;

const IMG = styled.img`
  display: inline-block;
  vertical-align: middle;
  transition: transform 0.3s ${p => p.theme.elastic2}, opacity 0.2s ${p => p.theme.elastic2};
  transform: ${p => (p.hover || p.noHover ? 'scale(1)' : 'scale(40)')};
  opacity: 0.8;
  width: auto;

  ${p => p.theme.media.mobile`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  `};
`;

const Infos = styled.div.attrs({
  className: 'infos',
}) `
  position: absolute;
  top: 0;
  left: ${p => (p.noHover ? 'auto' : '50%')};
  right: ${p => (p.noHover ? '0' : 'auto')};
  transform: ${p => (p.noHover ? 'none' : `translateX(${180 - OFFSET_X}px)`)};
  text-align: left;

  ${p => p.theme.media.tablet`
    transform: none;
    left: auto;
    right: 0;
    text-align: right;
  `};
`;

const H5 = styled.h5`
  font-size: 22px;
  font-weight: 100;
  letter-spacing: 0.1em;
  transition: transform .4s ${p => p.theme.elastic2}, opacity .4s ${p => p.theme.elastic2};
  transform: ${p => (p.hover || p.noHover ? 'none' : 'translateX(100%)')};
  opacity: ${p => (p.hover || p.noHover ? 1 : 0)};
  background-color: ${p => (p.noHover ? 'rgba(255,255,255,0.5)' : '#fff')};
  position: relative;
  z-index: 1;
  // color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  color: ${p => p.theme.grey};
  padding: 2px;
`;

const Date = styled.p`
  transition: transform 0.5s ${p => p.theme.elastic2}, opacity 0.5s ${p => p.theme.elastic2};
  transform: ${p => (p.hover || p.noHover ? 'none' : 'translateX(100%)')};
  opacity: ${p => (p.hover || p.noHover ? 1 : 0)};
  font-family: ${p => p.theme.font2};
  background-color: ${p => (!p.isprimary ? p.theme.primary : p.theme.secondary)};
  color: ${p => p.theme.grey};
  font-size: 12px;
  letter-spacing: 2px;
  padding: 2px;
`;

const Number = styled.p`
  position: absolute;
  bottom: 0;
  right: 50%;
  font-family: ${p => p.theme.font2};
  text-align: right;
  color: ${p => p.theme.grey};
  font-size: 0.7em;
  padding: 2px 0;
  transform: translateX(230px);
  letter-spacing: 0.1em;
`;

const BackLine = styled.div.attrs({
  className: 'back-line',
}) `
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transform: ${p => (p.hover ? 'translateY(-50%) scaleY(1)' : 'translateY(-50%) scaleY(0)')};
  transition: transform 0.5s ${p => p.theme.elastic2}, opacity 0.5s ${p => p.theme.elastic2};
`;

class Teaser extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = { hover: false };
  }

  shouldComponentUpdate(newProps, newState) {
    return this.state.hover !== newState.hover;
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const { entry, className, idx, noHover } = this.props;
    const isprimary = entry.category === 0;
    return (
      <LINK
        className={className}
        to={`/view/${entry.slug}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <BackLine
          hover={this.state.hover}
          noHover={noHover}
          isprimary={isprimary}
        />
        <Banner hover={this.state.hover}>
          <Back isprimary={!isprimary} />
          <IMG
            src={`assets/teasers/${entry.slug}.png`}
            alt={entry.title}
            hover={this.state.hover}
            noHover={noHover}
          />
        </Banner>
        <Infos
          noHover={noHover}
        >
          <H5
            hover={this.state.hover}
            isprimary={isprimary}
            noHover={noHover}
          >
            {entry.title}
          </H5>
          <Date
            hover={this.state.hover}
            isprimary={isprimary}
            noHover={noHover}
          >
            {entry.date}
          </Date>
        </Infos>
        <Number>{idx < 10 ? `_0${idx}` : `_${idx}`}</Number>
      </LINK>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Teaser.propTypes = {
    className: PropTypes.string,
    entry: PropTypes.shape({
      id: PropTypes.number,
      slug: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.number,
      tags: PropTypes.array,
      date: PropTypes.number,
      description: PropTypes.string,
    }),
    idx: PropTypes.number,
    noHover: PropTypes.bool,
  };
}

Teaser.defaultProps = {
  className: '',
  entry: {},
  idx: 0,
  noHover: false,
};

export default Teaser;
