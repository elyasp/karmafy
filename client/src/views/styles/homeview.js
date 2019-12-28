import styled from 'styled-components';


export const PageWrapper = styled.div `
display: flex;
align-items: center;
flex-direction: column;
padding: 15px;
text-align: center;

p {
  text-shadow: 1px 1px 10px #2d423f;
  font-weight: 200;
}

h1 {
  font-size: 60px;
  text-shadow: 1px 1px 10px #2d423f;
  font-weight: 200;
}

h2 {
  font-size: 30px;
  text-shadow: 1px 1px 10px #2d423f;
  font-weight: 200;
}
h4 {
  font-size: 20px;
  text-shadow: 1px 1px 10px #2d423f;
}

.form {
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 70vw;

  .buttonform {
    display: flex;
    justify-content: center;
    border-radius: 3px;
    width: 100%;
    border: 0.5px solid white;
    margin: 0.5em;

    background: #cc3232c7;
    transition: all 0.4s ease;
    -webkit-transition: all 0.5s ease;
    text-shadow: 1px 1px 5px #000;

    &:hover {
      background: hsla(0, 0%, 98%, 0.514);
      transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
      color: black;
    }

    h3 {
      font-weight: 200;
      letter-spacing: 0.1 em;
    }
  }
}
`;

export const Button = styled.form `
color: white;
width: 35%;
font-size: 1.5rem;
margin: 2rem;
padding: 1rem;
border-radius: 5px;
border: 2px solid white;
background: none;
&:hover {
  color: black;
  background: hsla(59, 100%, 49%, 0.34);
}
`;