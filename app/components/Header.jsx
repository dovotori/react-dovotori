import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SocialLinks from './SocialLinks';
import Logo from './Logo';
import SvgAnimation from './SvgAnimation';
import FullscreenView from './FullscreenView';
import { media } from '../themes/theme';

const WrapLogo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: auto;

  ${media.mobile`
    left: 50%;
    transform: translateX(-50%);
  `};
`;

const StyledLogo = styled(Logo)`
  display: block;
  width: 80px;
  height: auto;
  margin: 0 auto;
  fill: ${p => p.theme.back};
  color: ${p => p.theme.primary};
`;

const BackgroundLogo = styled(Logo)`
  position: absolute;
  right: 0;
  top: 50%;
  width: 100%;
  height: auto;
  transform: translate3d(50%, -50%, 0);
  display: block;
  fill: ${p => p.theme.primary};
  color: ${p => p.theme.primary};
  opacity: 0.2;
  pointer-events: none;
`;

const FillHeight = styled.div`
  height: 100%;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);

    this.state = { open: false, over: false };
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.open !== this.state.open || newState.over !== this.state.over;
  }

  click() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  mouseEnter() {
    this.setState(prevState => ({ over: !prevState.over }));
  }

  render() {
    return (
      <div className="header">
        <FullscreenView in={this.state.open}>
          {this.state.open && <FillHeight>
            <BackgroundLogo />
            <SocialLinks />
          </FillHeight>}
        </FullscreenView>
        <WrapLogo>
          <button onClick={this.click} onMouseEnter={this.mouseEnter} name="toggle links menu">
            <SvgAnimation toggleAnim={this.state.over}>
              <StyledLogo />
            </SvgAnimation>
          </button>
        </WrapLogo>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Header.propTypes = {};
}

Header.defaultProps = {};

export default Header;
