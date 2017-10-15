import theme from './theme';
import { stripes } from '../constants/imagesPaths';

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
  background: ${theme.grey};
  font-family: ${theme.font1};
}
`;

export default commonCss;
