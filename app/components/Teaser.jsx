import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { media } from '../themes/theme';
import Line from './Line';

const LINK = styled(Link).attrs({
  className: 'teaser',
})`
  position: relative;
  display: block;
  text-decoration: none;
  border-top: solid 1px #fff;
`;

const Banner = styled.div`
  position: relative;
  overflow: hidden;
  height: 80px;
  width: 400px;
  box-shadow: ${p => (p.hover ? '-4px 4px' : '-1px 1px')} 0 #aaa;
  transition: box-shadow 300ms ease-out;
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
  transition: transform 0.4s ${p => p.theme.elastic2}, opacity 0.4s ${p => p.theme.elastic2};
  transform: ${p => (p.hover ? 'scale(40)' : 'scale(1)')};
  opacity: 0.7;
  width: auto;

  ${media.mobile`
    width: 100%;
  `};
`;

const Infos = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  text-align: right;
  width: 100%;
  pointer-events: none;
  transform: translateY(-50%);
`;

const H5 = styled.h5`
  font-size: 22px;
  font-weight: 100;
  color: ${p => p.theme.grey};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: transform .4s ${p => p.theme.elastic2}, opacity .4s ${p => p.theme.elastic2};
  transform: ${p => (p.hover ? 'translateX(0)' : 'translateX(100%)')};
  opacity: ${p => (p.hover ? 1 : 0)};
  text-shadow: 1px 1px 0px rgba(0,0,0,0.5);

  span {
    position: relative;
    z-index: 1;
    color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
    padding: 2px;
  }
`;

const LineBottom = Line.extend`
  position: absolute;
  bottom: 0;
  animation-delay: 1s;
`;

const LineTop = Line.extend`
  position: absolute;
  top: 0;
`;

const Date = styled.p`
  transition: transform 0.5s ${p => p.theme.elastic2}, opacity 0.5s ${p => p.theme.elastic2};
  transform: ${p => (p.hover ? 'translateX(0)' : 'translateX(100%)')};
  opacity: ${p => (p.hover ? 1 : 0)};
  margin: 0;

  span {
    font-family: ${p => p.theme.font2};
    background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
    color: ${p => p.theme.grey};
    font-size: 12px;
    letter-spacing: 2px;
    padding: 2px;
  }
`;

const Number = styled.p`
  font-family: ${p => p.theme.font2};
  text-align: right;
  color: ${p => p.theme.grey};
  font-size: 0.8em;
  padding: 10px 0;
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
    const { entry, className, idx } = this.props;
    const isprimary = entry.category === 0;
    return (
      <LINK
        className={className}
        to={`/view/${entry.slug}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Banner hover={this.state.hover}>
          <Back isprimary={!isprimary} />
          <IMG
            src={`assets/teasers/${entry.slug}.png`}
            alt={entry.title}
            hover={this.state.hover}
          />
          <Infos>
            <H5 hover={this.state.hover} isprimary={isprimary}>
              <span>{entry.title}</span>
            </H5>
            <Date hover={this.state.hover} isprimary={isprimary}>
              <span>{entry.date}</span>
            </Date>
          </Infos>
          {/* <LineBottom hover={this.state.hover} isprimary={isprimary} time="2000" /> */}
          <LineTop hover={this.state.hover} isprimary={isprimary} time="2000" />
        </Banner>
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
  };
}

Teaser.defaultProps = {
  className: '',
  entry: {},
  idx: 0,
};

export default Teaser;
