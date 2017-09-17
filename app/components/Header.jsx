import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SocialLinks from './SocialLinks';
import Logo from './Logo';
import ButtonShy from './ButtonShy';
import SvgAnimation from './SvgAnimation';
import FullscreenView from './FullscreenView';

const Styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 10px;
  width: auto;
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
      || newState.over !== this.state.over;
  }

  click() {
    this.setState(prevState => ({ open: !prevState.open }))
  }

  mouseEnter() {
    this.setState(prevState => ({ over: !prevState.over }))
  }

  render() {
    return (
      <div>
        <FullscreenView in={this.state.open}>
          {this.state.open && <SocialLinks/>}
        </FullscreenView>
        <Styled>
          <ButtonShy
            onClick={this.click}
            onMouseEnter={this.mouseEnter}
          >
            <SvgAnimation
              toggleAnim={this.state.over}
            >
              <Logo />
            </SvgAnimation>
          </ButtonShy>
        </Styled>
      </div>
    );
  }
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
