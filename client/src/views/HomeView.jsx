import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ItemCard from "./../components/ItemCard";

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px;

  h1 {
    font-size: 60px;
    font-weight: 200;
  }
  h4 {
    font-size: 15px;
  }
`;

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <PageWrapper>
          <h1>Lost or Found something?</h1>
          <h4>Return it or find it back in Karmafy's exchange</h4>
        </PageWrapper>
        <ItemCard />
      </div>
    );
  }
}
