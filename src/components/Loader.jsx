import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% { transform: translateX(0) scale(0) rotateZ(45deg); }
  50% { transform: translateX(20px) scale(1) rotateZ(45deg); }
  100% { transform: translateX(40px) scale(0) rotateZ(45deg); }
`;

const Wrap = styled.div`
  position: relative;
  width: 40px;
  height: 10px;
`;

const Style = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  // background-color: ${p => p.theme.primary};
  border: solid 1px ${p => p.theme.primary};
  animation: ${loading} 1s linear infinite;
  animation-delay: ${p => p.delay}s;
`;

const Loader = () => (
  <Wrap>
    <Style delay={0} />
    <Style delay={0.5} />
  </Wrap>
);

export default Loader;
