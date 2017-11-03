import styled, { keyframes } from 'styled-components';

const pass = keyframes`
  100% { transform: translateX(-100%); }
  0% { transform: translateX(100%); }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${p => (p.isprimary ? p.theme.primary : p.theme.secondary)};
  animation: ${p => (p.hover ? `${pass} ${p.time}ms linear infinite` : 'none')};
  z-index: 0;
  opacity: 0.6;
  transform: translateX(-100%);
`;

export default Line;
