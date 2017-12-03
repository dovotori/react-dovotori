import styled from 'styled-components';

const Bloc = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  border-top: solid 1px ${p => p.theme.primary};
  ${p => p.theme.scrollbar};
`;

export default Bloc;
