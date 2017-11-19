import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import SocialLinks from './SocialLinks';
import Logo from './Logo';
import SvgAnimation from './SvgAnimation';
import TransitionFader from './TransitionFader';
import ViewNavigationContainer from '../containers/ViewNavigationContainer';
import { media } from '../themes/theme';

const StyledHeader = styled.div.attrs({
  className: 'header',
})`
  position: relative;
  z-index: 10;
`;

const WrapLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  stroke: ${p => p.theme.grey};
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

const Fullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${p => p.theme.gradient};
  width: 100%;
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
    return (
      <StyledHeader>
        <TransitionFader in={this.state.open}>
          <Fullscreen>
            <BackgroundLogo />
            <SocialLinks test={this.state.open} />
          </Fullscreen>
        </TransitionFader>
        <WrapLogo>
          <button
            onClick={this.click}
            onMouseEnter={this.mouseEnter}
            name="toggle links menu"
          >
            <SvgAnimation toggleAnim={this.state.over}>
              <StyledLogo />
            </SvgAnimation>
          </button>
          <Switch location={this.props.location}>
            <Route path="/view/:slug" component={ViewNavigationContainer} />
          </Switch>
        </WrapLogo>
      </StyledHeader>
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
