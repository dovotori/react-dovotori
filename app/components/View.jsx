import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
  padding: 40%;
  background-color: #f00;
`;

const View = () => (
  <Styled>
    <h1>Hello View</h1>
  </Styled>
);

export default View;
