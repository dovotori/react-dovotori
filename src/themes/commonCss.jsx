// import { css } from 'styled-components';
import theme from "./theme";

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

button {
  background: transparent;
  border: 0;
  cursor: pointer;
}

a:focus,
button:focus {
  text-decoration: none;
}

body {
  font-size: 16px;
  font-family: 'White Rabbit', sans-serif;
  ${theme.scrollbar}
}

@font-face {
  font-family: 'White Rabbit';
  src: url('./assets/fonts/whiterabbit.eot'),
    url('./assets/fonts/whiterabbit.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/whiterabbit.woff') format('woff'),
    url('./assets/fonts/whiterabbit.woff2') format('woff2'),
    url('./assets/fonts/whiterabbit.ttf')  format('truetype'),
    url('./assets/fonts/whiterabbit.svg#svgFontName') format('svg');
}
`;

export default commonCss;
