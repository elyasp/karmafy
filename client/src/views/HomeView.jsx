import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ItemCard from "./../components/ItemCard";

//////////////////////// STYLE /////////////////////////

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px;

  h1 {
    font-size: 60px;
    text-shadow: 1px 1px 10px #2d423f;
    font-weight: 200;
  }
  h4 {
    font-size: 15px;
    text-shadow: 1px 1px 10px #2d423f;
  }
`;

///////////////////////// END OF STYLE ////////////////

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <PageWrapper>
          <h1>Lost or Found something?</h1>
          <h4>
            Unite or find it back on Karmafy's exchange of lost belongings
          </h4>
        </PageWrapper>
        <ItemCard />
      </div>
    );
  }
}
