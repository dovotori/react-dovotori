import theme from '../themes/main';

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
  transition: opacity 500ms ease-in;
}

.fader-leave {
  opacity: 1;
}

.fader-leave.fader-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}

.route-enter {
  transform: translate3d(100%,0,0);
}

.route-enter.route-enter-active {
  transform: translate3d(0,0,0);
  transition: transform 500ms ease-in;
}

.route-leave {
  transform: translate3d(0,0,0);
}

.route-leave.route-leave-active {
  transform: translate3d(100%,0,0);
  transition: transform 300ms ease-in;
}
`;

export default commonCss;