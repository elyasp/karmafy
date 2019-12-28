import styled from 'styled-components';


export const ViewWrapper = styled.div `
  color: #fff;
  width: 100%;
  height: 100vh;
  padding: 5px;
  background: hsla(254, 100%, 42%, 0.2);
`;

export const ProfileWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button `
  margin: 10px;
  color: white;
  border-radius: 5px;
  border: none;
  background: none;
  &:hover {
    color: black;
  }
`;