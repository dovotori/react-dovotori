import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  6% { opacity: 0; }
  9% { opacity: 1; }

  20% { opacity: 1; }
  26% { opacity: 0; }
  29% { opacity: 1; }

  70% { opacity: 1; }
  76% { opacity: 0; }
  86% { opacity: 0; }
  89% { opacity: 1; }
`;

const inverseblink = keyframes`
  50% { opacity: 1; }
  56% { opacity: 0; }
  60% { opacity: 0; }
  62% { opacity: 1; }
`;

const StyledBlink = styled.div`
  svg {
    display: block;
    margin: 0 auto;
    fill: ${p => p.theme.back};
    color: ${p => p.theme.primary};
    height: auto;

    .blink {
      animation: ${blink} 4s linear infinite;
    }

    .inverse-blink {
      animation: ${inverseblink} 4s linear infinite;
    }

    .stroke {
      stroke: ${p => p.theme.primary};
      stroke-width: 2px;
    }
  }
`;

export default StyledBlink;
