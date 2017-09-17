import theme from './theme';
import { stripes } from '../constants/imagesPaths';

const commonCss = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #dovotori-app {
  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
  // background: url(${stripes}) repeat ${theme.back};
  background: ${theme.grey};
  background-attachment: fixed;
  font-family: ${theme.font1};
}

#dovotori-app {
  // perspective: 1000px;
  // margin: 40px;
}

.route-transition > div {
  transition: transform 200ms ${theme.elastic};
}
`;

export default commonCss;
