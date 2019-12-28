import styled from "styled-components";

export const ViewWrapper = styled.div `
  padding: 3em;
  color: #fff;
  width: 100%;
  height: 76.5vh;
  line-height: 2em;
  text-shadow: 1px 1px 4px #2b3d3a;
  font-weight: 200;
`;

export const ProfileWrapper = styled.div `
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  h1 {
    font-weight: 200;
    font-size: 2em;
  }

  h3 {
    font-weight: 200;
    font-size: 1em;
  }
  h6 {
    font-size: 2.5em;
  }
  span {
    letter-spacing: 0.4em;
  }

  .editlink {
    text-decoration: none;
  }
`;

export const CardWrapper = styled.div `
  margin-top: 2.5em;
  margin-bottom: 2em;

  .carditem {
    min-height: 20em;
    border: none;
    background: hsl(0, 0%, 100%);
    transition: 0.4s;
    width: 100%;
    min-height: 25em;
    cursor: pointer;
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      10px 10px 30px 15px rgba(0, 0, 0, 0.22);

    &:hover {
      transform: scale(1.05, 1.05);
      transition: 0.4s;
      box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
        10px 10px 30px 15px rgba(0, 0, 0, 0.22);
    }
  }

  .cardtitle {
    font-size: 20px;
    color: black;
  }

  .cardsubtitle {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: rgba(3, 0, 0, 0.808);
    margin-left: 1em;
  }
  .editlink {
    text-decoration: none;
  }

  .editbutton {
    border-radius: 2px solid black;
    background: rgb(0, 199, 133);
  }

  .markbutton {
    border-radius: 2px solid black;
    background: rgb(0, 199, 133);
  }
`;

export const ItemSection = styled.div `
  height: 150vh;
  margin-top: 6em;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: #070424;
  p {
    color: white;
  }
  h4 {
    color: white;
    letter-spacing: 0.35em;
    font-size: 0.7em;
    font-weight: 200;
    text-shadow: 5px 5px 13px #2b3d3a;
  }
`;

export const Button = styled.button `
  border: 0.5px solid #ffffffb0;
  border-radius: 3px;
  display: flex;
  justify-self: center;
  font-size: 20px;
  margin: 0.5em;
  background: none;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;

  &:hover {
    background: hsla(0, 0%, 98%, 0.514);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    color: black;
  }
  h5 {
    height: 1em;
    color: white;
    font-weight: 200;
    text-shadow: 1px 1px 6px #2c0401;
  }
`;

export const FoundCardHeader = styled.div `
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h6 {
    margin-top: 0.5em;
    color: #5bf7a9;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
    font-size: 1em;
  }
`;

export const LostCardHeader = styled.div `
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h6 {
    font-size: 1em;
    margin-top: 0.5em;
    color: #ff3c00;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;