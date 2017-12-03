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
  // outline: 0;
}

button {
  background: transparent;
  border: 0;
  cursor: pointer;
}

a:focus,
button:focus {
  text-decoration: none;
  // outline: none;
}

button::-moz-focus-inner {
  border: 0;
}

body {
  // font-family: ${theme.font1};
  font-family: 'Space Mono', monospace;
  ${theme.scrollbar}
}

@font-face {
  font-family: 'White Rabbit';
  src: url('../../assets/fonts/whitrabt.eot');
  src: url('../../assets/fonts/whitrabt.eot?#iefix') format('embedded-opentype'),
       url('../../assets/fonts/whitrabt.woff') format('woff'),
       url('../../assets/fonts/whitrabt.ttf')  format('truetype'),
       url('../../assets/fonts/whitrabt.svg#svgFontName') format('svg');
}
`;

export default commonCss;
