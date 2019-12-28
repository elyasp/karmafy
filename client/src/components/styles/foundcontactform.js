import styled from 'styled-components';

export const Button = styled.button `
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  margin-right: 30px;
  &:hover {
    color: black;
    background: hsla(360, 100%, 49%, 0.34);
  }
`;

export const TextStyler = styled.div `
  text-shadow: 1px 1px 9px #000;
  text-align: center;
  font-weight: 200;
  margin-bottom: 10vh;
`;