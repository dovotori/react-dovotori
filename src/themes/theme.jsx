import { css } from "styled-components";

const hue = {
  primary: 160, // hsl(160, 100%, 70%) // rgb(102, 255, 204) // #66ffcc
  secondary: 30, // hsl(30, 100%, 70%) // rgb(255, 179, 102) // #ffb366
};

export default {
  primary: `hsl(${hue.primary}, 100%, 70%)`,
  primaryDark: `hsl(${hue.primary}, 60%, 60%)`,
  secondary: `hsl(${hue.secondary}, 100%, 70%)`,
  secondaryDark: `hsl(${hue.secondary}, 60%, 60%)`,
  tertiary: "#ffa600",
  dark: "#222",
  mild: "#666",
  light: "#bbb",
  gradient: "linear-gradient(#009966, #66ffcc)",
  gradient2: "linear-gradient(to right, #009966, #66ffcc)",
  elastic: "cubic-bezier(0.64, 0.57, 0.67, 1.53)",
  elastic2: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
  font1: "Verdana, Helvetica, sans-serif",
  font2: "'Courier New', serif",
  scrollbar: css`
    ::-webkit-scrollbar {
      width: 4px;
      background-color: #222;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #66ffcc;
    }
  `,
  breakpoint: {
    mobile: 420,
    tablet: 1020,
  },
  media: {
    mobile: (...args) =>
      css`
        @media (max-width: 420px) {
          ${css(...args)};
        }
      `,
    tablet: (...args) =>
      css`
        @media (max-width: 1020px) {
          ${css(...args)};
        }
      `,
  },
  motion: { stiffness: 120, damping: 20 },
  zindex: {
    logo: 100,
    menu: 50,
    content: 10,
  },
};
