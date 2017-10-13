import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StaggeredMotion, spring } from 'react-motion';

import Svg from '../components/Svg';
import withTooltip from '../components/withTooltip';

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  perspective: 1000px;

  svg {
    width: 50%;
    height: 50%;
    display: inline-block;
    margin: 0 20px;
    fill: #fff;
    transform: scale(1);
    transition: transform 300ms ${p => p.theme.elastic2};

    :hover {
      transform: scale(2);
    }
  }
`;

const FlexItem = styled.div`
  width: 25%;
  max-width: 120px;
`;

const P = styled.div`
  color: ${p => p.theme.dark};
  letter-spacing: 0.15em;
  font-size: 0.7em;
  font-weight: 100;
  text-align: center;
`;

const A = styled.a`
  display: block;
`;


const Linkedin = withTooltip(() => (
 <A href="http://fr.linkedin.com/pub/dorian-ratovo/95/a9a/636">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path d="m1.47 0c-.814 0-1.47.645-1.47 1.44v17.1c0 .796.661 1.44 1.47 1.44h17c.816 0 1.48-.646 1.48-1.44v-17.1c0-.797-.663-1.44-1.48-1.44zm2.97 2.75c.949 0 1.72.771 1.72 1.72s-.771 1.72-1.72 1.72c-.953 0-1.72-.77-1.72-1.72 0-.949.768-1.72 1.72-1.72zm9.04 4.51c3 0 3.56 1.98 3.56 4.55v5.23h-2.97v-4.64c0-1.11-.0197-2.53-1.54-2.53-1.54 0-1.78 1.21-1.78 2.45v4.72h-2.96v-9.54h2.84v1.31h.0402c.396-.751 1.36-1.54 2.81-1.54zm-10.5.237h2.97v9.54h-2.97z" />
    </svg>
  </A>
), "let's talk business");

const Github = withTooltip(() => (
  <A href="https://github.com/dovotori">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path d="m10 .247c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.84 9.49.5.0909.683-.217.683-.483 0-.236-.00859-.866-.0135-1.7-2.78.604-3.37-1.34-3.37-1.34-.455-1.15-1.11-1.46-1.11-1.46-.908-.621.0688-.608.0688-.608 1 .0706 1.53 1.03 1.53 1.03.892 1.53 2.34 1.09 2.91.831.0909-.647.349-1.09.635-1.34-2.22-.252-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.103-.253-.446-1.27.0976-2.65 0 0 .84-.269 2.75 1.03.797-.222 1.65-.333 2.5-.336.849.0037 1.7.115 2.5.336 1.91-1.29 2.75-1.03 2.75-1.03.546 1.38.203 2.39.0994 2.65.641.699 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.359.309.678.919.678 1.85 0 1.34-.0123 2.42-.0123 2.74 0 .268.18.579.688.482 3.97-1.33 6.83-5.07 6.83-9.49.000614-5.52-4.48-10-10-10" />
    </svg>
  </A>
), "code is law");

const Cv = withTooltip(() => (
  <A href="dorian_ratovo_portfolio_2016_screen.pdf">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path d="m15.7 6.5e-8h-11.3c-1.26 0-2.28 1.02-2.28 2.28v15.4c0 1.26 1.02 2.28 2.28 2.28h11.3c1.26 0 2.28-1.02 2.28-2.28v-15.4c.00091-1.26-1.02-2.28-2.28-2.28zm-11.5 7.69c0-.532.433-.965.965-.965h.338c-.36-.398-.582-.924-.582-1.5 0-1.24 1.01-2.24 2.24-2.24s2.24 1.01 2.24 2.24c0 .578-.221 1.11-.582 1.5h.323c.532 0 .965.432.965.965v1.63c0 .51-.398.924-.901.96h-4.12c-.5-.0346-.901-.448-.901-.96zm10.7 9.37h-9.78c-.5 0-.91-.408-.91-.91s.408-.91.91-.91h9.78c.5 0 .91.408.91.91s-.408.91-.91.91zm0-3.41h-9.78c-.5 0-.91-.408-.91-.91s.408-.91.91-.91h9.78c.5 0 .91.408.91.91s-.408.91-.91.91zm0-3.41h-2.96c-.5 0-.91-.408-.91-.91s.408-.91.91-.91h2.96c.5 0 .91.408.91.91s-.408.91-.91.91z" />
    </svg>
  </A>
), "pretty much amazing");


const Mail = withTooltip(() => (
  <A href="mailto:mailto:dorian.r@openmailbox.org">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path d="m1.92 6.99c2.66 1.75 4.46 3.23 6.87 4.75.375.27.796.315 1.2.401.266-.0021.383-.0283.581-.1.86-.345 1.55-.893 2.3-1.43.684-.476 2.43-1.69 5.22-3.63.543-.379.997-.837 1.36-1.37.365-.536.547-1.1.547-1.69 0-.491-.177-.912-.53-1.26-.353-.35-.772-.525-1.26-.525h-16.4c-.573 0-1.01.193-1.32.58-.309.387-.463.871-.463 1.45.179 1.28 1.02 2.04 1.92 2.81z" />
      <path d="m18.9 8.18c-2.26 1.5-4.44 3.08-6.59 4.58-.264.175-.616.353-1.05.536-.439.182-.848.273-1.23.273h-.0226c-.379 0-.789-.091-1.23-.273-.439-.182-.791-.361-1.05-.536-2.28-1.62-4.72-3.32-6.58-4.58-.424-.283-.8-.606-1.13-.971v8.86c0 .491.175.912.525 1.26.35.35.77.525 1.26.525h16.4c.491 0 .911-.175 1.26-.525.35-.35.525-.77.525-1.26v-8.86c-.32.357-.692.681-1.12.971z" />
    </svg>
  </A>
), "konnichi wa");



class SocialLinks extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const links = [
      <Linkedin />,
      <Github />,
      <Cv />,
      <Mail />
    ];

    const motion = { stiffness: 300, damping: 20 };

    return (<StaggeredMotion
      defaultStyles={[{h: 0}, {h: 0}, {h: 0}, {h: 0}]}
      styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {h: spring(1, motion)}
          : {h: spring(prevInterpolatedStyles[i - 1].h, motion)}
      })}>
      {interpolatingStyles =>
        <Styled>
          {interpolatingStyles.map((style, i) =>
            <FlexItem key={i} style={{
              transform: `translateZ(${(1 - style.h) * -100}vw)`,
              opacity: style.h,
            }}>
              <P>{links[i]}</P>
            </FlexItem>)
          }
        </Styled>
      }
    </StaggeredMotion>);
  }
}

SocialLinks.propTypes = {
};

SocialLinks.defaultProps = {
};

export default SocialLinks;