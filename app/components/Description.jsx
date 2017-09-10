import styled from 'styled-components';

const Description = styled.p`
  font-weight: 100;
  font-size: 11px;
  line-height: 20px;
  text-align: center;
  font-weight: 100;
  letter-spacing: 1px;

  span {
    border-radius: 2px;
    padding: 4px;
    background-color: ${props => props.theme.back};
    color: #fff;
  }
`;

export default Description;
