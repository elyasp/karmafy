import styled from "styled-components";

export const Map = styled.div`
  height: 500px;
  max-width: 90vh;
  margin-left: 8%;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  text-align: center;

  .searchfilter {
    display: flex;
    width: 100%;
  }

  #clicked {
    background: white;
    font-weight: 600;
    color: #ac9dbf;
  }

  .filterBtn {
    width: 45%;
    border: 0.5px solid #ffffffb0;
    border-radius: 2px;
    text-align: center;
    justify-self: center;
    font-size: 22px;
    margin: .5em;
    color: white;
    background: transparent;

    border: 3px solid white;
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;

    &:hover {
      background: hsla(0, 0%, 98%, 0.514);
      transition: all 0.4s ease;
      -webkit-transition: all 0.4s ease;
      color: #373333;
    }
`;

export const CardWrapper = styled.div`
  margin-top: 2.5em;
  margin-bottom: 2em;

  .carditem {
    min-height: 25em;
    border: none;
    background: hsl(0, 0%, 100%);
    transition: 0.4s;
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
`;

export const FoundCardHeader = styled.div`
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

export const LostCardHeader = styled.div`
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
