import styled from "styled-components";

export const Positioner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  margin-top: 40px;

  .entries {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
`;

export const Button = styled.button`
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  margin-bottom: 3em;
  &:hover {
    color: black;
    background: hsla(59, 100%, 49%, 0.34);
  }
`;
