import React, { Component } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./../components/ItemCard";
import { PageWrapper, Button } from "./styles/homeview.js";

export default class HomeView extends Component {
  render() {
    return (
      <div>
        <PageWrapper>
          <h1>Lost or Found something?</h1>
          <p>◯</p>
          <h4>Karmafy helps you making people happy</h4>
          <p>◯</p>
          <h4>returning their belongings</h4>
          <p>◯</p>
          <h4>offering you their gratitude</h4>
          <p>◯</p>
          <h4>making you happier</h4>

          <p>◯</p>
          <br />
          <Link to="item/add" className="form">
            <Button className="buttonform">
              <h3>ADD A LOST OR FOUND ITEM</h3>
            </Button>
          </Link>

          <br />
          <p>◯</p>
          <p>◯</p>
          <p>◯</p>
          <p>◯</p>
          <br />
          <h2> Or search for existing items in Karmafy's network</h2>
          <br />
          <p>◯</p>
          <p>◯</p>
          <p>◯</p>
          <p>◯</p>
        </PageWrapper>

        <ItemCard />
      </div>
    );
  }
}
