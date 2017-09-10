import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 40px;
  left: 0;
`;

const Column = styled.div`
  margin: 0 auto;
  width: 400px;
`;

export const withMainColumn = Component => props => (
  <Wrapper>
    <Column>
      <Component {...props} />
    </Column>
  </Wrapper>
);
