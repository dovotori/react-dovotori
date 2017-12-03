import styled, { keyframes } from 'styled-components';

const pass = keyframes`
0% { transform: translateX(100%) scaleX(0); }
50% { transform: translateX(0%) scaleX(1); }
100% { transform: translateX(0%) scaleX(0); }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  animation: ${p => (p.hover ? `${pass} ${p.time}ms linear infinite` : 'none')};
  z-index: 0;
  opacity: 0.6;
  transform-origin: 0% 0%;
  transform: translateX(100%) scaleX(0);
`;

export default Line;
