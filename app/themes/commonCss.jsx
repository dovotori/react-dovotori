import theme from '../themes/main';

const elastic = 'cubic-bezier(0.64, 0.57, 0.67, 1.53)';
// const transition = 'cubic-bezier(.33,.72,.58,1)';

const commonCss = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

body {
  background-color: ${theme.lightgrey};
  font-family: Tahoma, Geneva, Kalimati, sans-serif;
}

#app {
  perspective: 1000px;
  margin: 40px;
}

.route-transition > div {
  transition: transform 200ms ${elastic};
}
`;

export default commonCss;
