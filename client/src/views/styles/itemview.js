import styled from 'styled-components';

export const PageWrapper = styled.div `
  font-weight: 400;
  margin-bottom: 10vh;

  .accessdenied {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

export const CardWrapper = styled.div `
  color: black;
  width: 80%;
  border-radius: 2px;
  margin: 0 auto;
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    10px 10px 30px 15px rgba(0, 0, 0, 0.22);

  .map {
    display: flex;
    justify-content: center;
  }

  .editbutton {
    max-height: 4em;
  }
  .markbutton {
    min-height: 4em;
    max-height: 4em;
  }
`;

export const MailWrapper = styled.div `
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  font-weight: 600;
`;

export const Button = styled.button `
  width: 100%;
  border: 1px solid black;

  min-height: 3em;
  margin: 1em 0;
  border-radius: 5px;
  background-color: white;
  color: black;

  &:hover {
    color: black;
    background: hsla(360, 100%, 49%, 0.34);
  }
`;

export const Center = styled.div `
  display: flex;
  justify-content: center;
  margin-top: 30vh;

  h3 {
    font-size: 50px;
    font-weight: 200;
  }
`;
export const TextStyler = styled.div `
  text-shadow: 1px 1px 9px #000;
  text-align: center;
`;

export const FoundCardHeader = styled.div `
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h4 {
    margin-top: 0.2em;
    color: #5bf7a9;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;

export const LostCardHeader = styled.div `
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h4 {
    margin-top: 0.2em;
    color: #ff3c00;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;