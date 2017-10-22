import theme from './theme';

const commonCss = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#dovotori-app {
  width: 100%;
  height: 100%;
}

a,
a:hover,
a:active,
a:focus {
  outline: 0;
}

button {
  background: transparent;
  border: 0;
  cursor: pointer;
}

a:focus,
button:focus {
  text-decoration: none;
  outline: none;
}

button::-moz-focus-inner {
  border: 0;
}

body {
  font-family: ${theme.font1};
}

.fadeTranslate-enter {
  opacity: 0;
  transform: translate(0, -3vh);
  position: fixed;
}

.fadeTranslate-enter.fadeTranslate-enter-active {
  opacity: 1;
  transform: translate(0, 0);
  transition: opacity 500ms ease-in 500ms, transform 500ms ease-in-out 500ms;
}

.fadeTranslate-exit {
  opacity: 1;
  position: fixed;
  transform: translate(0, 0);
}

.fadeTranslate-exit.fadeTranslate-exit-active {
  opacity: 0;
  transform: translate(0, 3vh);
  transition: opacity 300ms ease-in, transform 300ms ease-in-out;
}
`;

export default commonCss;
