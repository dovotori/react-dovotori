import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const pass = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const LINK = styled(Link)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
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
  transition: transform .4s ${p => p.theme.elastic2}, opacity .4s ${p => p.theme.elastic2};
  transform: ${p => (p.hover ? 'scale(40)' : 'scale(1)')};
  opacity: 0.5;
`;

const Infos = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  text-align: center;
  width: 100%;
  pointer-events: none;
  transform: translateY(-50%);
`;

const Banner = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  animation: ${p => (p.hover ? `${pass} 2s ${p.theme.elastic2} infinite` : 'none')};
  transform: translateX(-100%);
  z-index: 0;
`;

const H5 = styled.h5`
  font-size: 1em;
  line-height: 0.8;
  font-weight: 100;
  color: ${p => p.theme.grey};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: transform .4s ${p => p.theme.elastic2}, opacity .4s ${p => p.theme.elastic2};
  transform: ${p => (p.hover ? 'translateX(0)' : 'translateX(-100%)')};
  opacity: ${p => (p.hover ? 1 : 0)};

  span {
    position: relative;
    z-index: 1;
    background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
    padding: 0 2px;
    // box-shadow: -1px 1px 0 ${p => p.theme.grey};
  }
`;

const P = styled.p`
  font-size: 14px;
  color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  text-shadow: 1px 1px 0px #000;
  transition: transform .5s ${p => p.theme.elastic2}, opacity .5s ${p => p.theme.elastic2};
  transform: ${p => (p.hover ? 'translateX(0)' : 'translateX(-100%)')};
  opacity: ${p => (p.hover ? 1 : 0)};
  padding: 10px 4px 0;
  letter-spacing: 0.5em;
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
    const { entry, className } = this.props;
    return (
      <LINK
        className={className}
        to={`/view/${entry.slug}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Back
          isprimary={entry.category === 1}
        />
        <IMG
          src={`assets/teasers/${entry.slug}.png`}
          alt={entry.title}
          hover={this.state.hover}
        />
        <Infos>
          <H5
            hover={this.state.hover}
            isprimary={entry.category === 0}
          >
            <Banner hover={this.state.hover} isprimary={entry.category === 0} />
            <span>{entry.title}</span>
          </H5>
          <P hover={this.state.hover} isprimary={entry.category === 0}>
            {entry.date}
          </P>
        </Infos>
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
  };
}

Teaser.defaultProps = {
  className: '',
  entry: {},
};

export default Teaser;
