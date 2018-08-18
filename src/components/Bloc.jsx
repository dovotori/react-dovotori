import styled from "styled-components";

const Bloc = styled.div`
  position: relative;
  z-index: ${p => p.theme.zindex.content};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
`;

export default Bloc;
