import theme from '../themes/main';

// const elastic = 'cubic-bezier(0.64, 0.57, 0.67, 1.53)';
const transition = 'cubic-bezier(.33,.72,.58,1)';

const commonCss = `body {
  margin: 0;
  padding: 0;
  background-color: ${theme.lightgrey};
  font-family: sans-serif;
}

.fader-enter {
  opacity: 0.01;
}

.fader-enter.fader-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.fader-leave {
  opacity: 1;
}

.fader-leave.fader-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}

.route-enter {
  z-index: 2;
  transform: translate3d(100%,0,0);
}

.route-enter.route-enter-active {
  transform: translate3d(0,0,0);
  transition: transform 300ms ${transition};
}

.route-leave {
  z-index: 1;
  transform: translate3d(0,0,0);
}

.route-leave.route-leave-active {
  transform: translate3d(100%,0,0);
  transition: transform 300ms ${transition};
}
`;

export default commonCss;
