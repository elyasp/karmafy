import styled from 'styled-components';

export const Button = styled.button `
  color: white;
  flex: 0 0 45%;
  width: 35%;
  font-size: 1.5rem;
  margin: 2rem auto;
  display: block;
  padding: 1rem;
  border-radius: 5px;
  border: 0.5px solid white;
  background: none;
  transition: all 0.6s ease;
  -webkit-transition: all 0.6s ease;
  text-shadow: 1px 1px 9px #2c0401;
  &:hover {
    color: black;
    text-shadow: 1px 1px 7px #2c0401;
    background: hsla(360, 100%, 49%, 0.5);
    transform: scale(1.1, 1.1);
    transition: all 0.6s ease;
    -webkit-transition: all 0.6s ease;
  }
`;