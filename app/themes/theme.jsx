import { css } from 'styled-components';

const theme = {
  primary: '#66ffcc',
  secondary: '#ff6633',
  tertiary: '#ffa600',
  back: '#fff',
  grey: '#222226',
  dark: '#222',
  lightgrey: '#bbb',
  gradient: 'linear-gradient(#009966, #66ffcc)',
  gradient2: 'linear-gradient(to right, #009966, #66ffcc)',
  elastic: 'cubic-bezier(0.64, 0.57, 0.67, 1.53)',
  elastic2: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
  font1: '"Geneva", sans-serif',
  font2: 'White Rabbit',
  scrollbar: css`
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  `,
  breakpoint: {
    mobile: 420,
    tablet: 1020,
  },
  media: {
    mobile: (...args) => css`@media (max-width: 420px) { ${css(...args)}; }`,
    tablet: (...args) => css`@media (max-width: 1020px) { ${css(...args)}; }`,
  },
};

export default theme;
