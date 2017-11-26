import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Route, Switch } from 'react-router-dom';
import { Motion, spring } from 'react-motion';

import SocialLinks from './SocialLinks';
import Logo from './Logo';
import SvgAnimation from './SvgAnimation';
import ViewNavigationContainer from '../containers/ViewNavigationContainer';

const StyledHeader = styled.div.attrs({
  className: 'header',
}) `
  position: relative;
  z-index: 10;
`;

const FixedLogo = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  z-index: 2;

  ${p => p.theme.media.mobile`
    // left: 50%;
    // transform: translateX(-50%);
  `}
`;

const FixedNav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 80px;
  width: auto;
  height: 80px;
  z-index: 2;

  ${p => p.theme.media.mobile`
    left: 50%;
    transform: translateX(-50%);
  `}
`;

const StyledLogo = styled.svg`
  position: relative;
  display: block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  fill: ${p => p.theme.back};
  stroke: ${p => p.theme.grey};
  color: ${p => p.theme.primary};
`;

const Cross = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 40px;
  height: 40px;
  margin: 20px;
  fill: #fff;
  stroke: ${p => p.theme.grey};
`;

const BackgroundLogo = styled.div.attrs({
  className: 'background-logo',
}) `
  position: fixed;
  display: block;
  left: 100%;
  top: 50%;
  width: 100%;
  height: auto;
  fill: ${p => p.theme.primary};
  color: ${p => p.theme.primary};
  opacity: 0.2;
  pointer-events: none;
  z-index: 2;

  ${p => p.theme.media.tablet`
    width: 200%;
  `}
`;

const StyledLogoBack = styled(Logo) `
  width: 100%;
  height: 100%;
`;

const Fullscreen = styled.div.attrs({
  className: 'fullscreen',
}) `
  position: fixed;
  top: 0;
  left: -400%;
  background: ${p => p.theme.grey};
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Banner = styled.div`
  position: fixed;
  top: 25%;
  left: -100%;
  width: 100%;
  height: 50%;
  background: ${p => p.theme.gradient};
  z-index: 1;
  box-shadow: -20px 0 20px rgba(0,0,0,0.8);
  transform: translateX(100%);

  ${p => p.theme.media.mobile`
    top: 15%;
    height: 70%;
  `}
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.state = { open: false, over: false };
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.open !== this.state.open
      || newState.over !== this.state.over
      || newProps.location.pathname !== this.props.location.pathname;
  }

  click() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  mouseEnter() {
    this.setState(prevState => ({ over: !prevState.over }));
  }

  render() {
    const motion = { stiffness: 120, damping: 14 };
    const motion2 = { stiffness: 200, damping: 30 };
    const defaultStyle = {
      x: this.state.open ? 0 : 1,
      x2: this.state.open ? 0 : 1,
    };
    const style = {
      x: this.state.open ? spring(1, motion) : spring(0, motion),
      x2: this.state.open ? spring(1, motion2) : spring(0, motion2),
    };

    return (
      <Motion defaultStyle={defaultStyle} style={style}>
        {interpolatingStyle => (
          <StyledHeader>
            <FixedLogo
              onClick={this.click}
              onMouseEnter={this.mouseEnter}
              name="toggle links menu"
              style={{ transform: `rotateZ(${interpolatingStyle.x * 90}deg)` }}
            >
              <SvgAnimation toggleAnim={this.state.over}>
                <StyledLogo
                  width="40"
                  height="40"
                  viewBox="0 -10 40 60"
                  style={{ opacity: 1 - interpolatingStyle.x }}
                >
                  <path
                    className="inverse-blink"
                    d="m12 8h-4.8l-7.5 7.5v1.6l7.2 7.2h1.9v-5.9l1.3-1.3v-7.2z"
                  />
                  <path
                    className="inverse-blink"
                    d="m6.8 28-4 4 8 8 1.6-1.6v-1.1l3.2-3.2h8l3.2 3.2v1.1l1.6 1.6 8-8-4-4z"
                  />
                  <path
                    className="blink"
                    fill="currentColor"
                    d="m16 0-1.6 1.6 3.5 3.5-7.2 7.2 3.7 3.7v-4l1.6-1.6 1.9 1.9h3.2l1.9-1.9 1.6 1.6v4l3.7-3.7-7.2-7.2 3.5-3.5-1.6-1.6-3.5 3.5z"
                  />
                  <path
                    className="inverse-blink"
                    d="m27 8h4.8l7.5 7.5v1.6l-7.2 7.2h-1.9v-5.9l-1.3-1.3v-7.2z"
                  />
                </StyledLogo>
                <Cross
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  style={{ opacity: interpolatingStyle.x }}
                >
                  <path d="M0 2 L2 0 L5 3 L8 0 L10 2 L7 5 L10 8 L8 10 L5 7 L2 10 L0 8 L3 5Z" strokeWidth="0.3" />
                </Cross>
              </SvgAnimation>
            </FixedLogo>
            <FixedNav>
              <ViewNavigationContainer
                menuOpened={this.state.open}
              />
            </FixedNav>
            <Fullscreen style={{ transform: `translateX(${interpolatingStyle.x2 * 400}%)` }} />
            <Banner style={{ transform: `translateX(${interpolatingStyle.x2 * 100}%)` }}>
              <SocialLinks in={this.state.open} />
            </Banner>
            <BackgroundLogo style={{ transform: `translate3d(${interpolatingStyle.x * -50}%, -50%, 0)` }}>
              <StyledLogoBack />
            </BackgroundLogo>
          </StyledHeader>
        )}
      </Motion>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Header.propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
  };
}

Header.defaultProps = {};

export default Header;
