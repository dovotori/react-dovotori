import styled from 'styled-components';

import { blink } from '../themes/animations';

const Cursor = styled.span`
  display: inline-block;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background-color: ${p => p.theme.secondary};
  animation: 0.4s infinite ${blink};
`;

export default Cursor;
