import theme from '../themes/theme';
import { stripes } from '../constants/imagesPaths';

const commonCss = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
  background: url(${stripes}) repeat ${theme.back};
  background-attachment: fixed;
  font-family: Tahoma, Geneva, Kalimati, Helvetica, sans-serif;
}

#app {
  // perspective: 1000px;
  // margin: 40px;
}

.route-transition > div {
  transition: transform 200ms ${theme.elastic};
}
`;

export default commonCss;
