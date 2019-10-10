import React, { Component } from "react";

import styled from "styled-components";
// import { Form, Button } from "react-bootstrap";

import FoundItemForm from "../components/FoundItemForm";
import LostItemForm from "../components/LostItemForm";
import { add } from "./../services/itemApi";
import { uploadImage } from "./../services/itemApi";

////////////////////// STYLE ////////////////////////

const Button = styled.button`
  color: white;
  flex: 0 0 45%;
  width: 35%;
  font-size: 1.5rem;
  margin: 2rem 0.5rem;
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

// const Positioner = styled.div`
//   margin-top: 30vh;
// `;

const Positioner = styled.div``;

/////////////////////// END OF STYLE ////////////////////

export default class ItemAddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        user: "",
        title: "",
        description: "",
        ownerCheck: "",
        itemStatus: "",
        postedBy: "",
        imageUrl: [
          {
            image: ""
          }
        ],
        location: {},
        imageUploaded: ""
      }
    };
    this.onFormValueChange = this.onFormValueChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addLost = this.addLost.bind(this);
    this.addFound = this.addFound.bind(this);
  }

  onFormValueChange(data) {
    this.setState({
      item: {
        ...this.state.item,
        ...data
      }
    });
  }

  addItem() {
    console.log("adding");
    const item = this.state.item;
    add(item)
      .then(item => {
        this.props.history.push(`/item/${item.data.data.item._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  addLost() {
    this.setState({
      item: {
        itemStatus: "Lost",
        user: this.props.user._id,
        postedBy: this.props.user.name
      }
    });
  }

  addFound() {
    this.setState({
      item: {
        itemStatus: "Found",
        user: this.props.user._id,
        postedBy: this.props.user.name
      }
    });

    return (
      <FoundItemForm
        value={this.state.item}
        onValueChange={this.onFormValueChange}
        onFormSubmit={this.addItem}
      >
        <Button type="submit">Add Item</Button>
      </FoundItemForm>
    );
  }

  render() {
    const isEnabled = this.state.item.imageUploaded === "loading";
    return (
      <Positioner>
        <div class="container">
          <h1 className="text-center ">Add an item to the exchange</h1>
          <div class="container mx-auto ">
            <div class="row justify-content-center">
              <Button onClick={this.addLost} class="col-6 my-3" variant="light">
                Lost
              </Button>
              <Button onClick={this.addFound} class="col-6" variant="light">
                Found
              </Button>
            </div>
          </div>

          {this.state.item.itemStatus === "Lost" && (
            <LostItemForm
              value={this.state.item}
              onValueChange={this.onFormValueChange}
              onFormSubmit={this.addItem}
            >
              <Button disabled={isEnabled} type="submit">
                Submit
              </Button>
            </LostItemForm>
          )}

          {this.state.item.itemStatus === "Found" && (
            <FoundItemForm
              value={this.state.item}
              onValueChange={this.onFormValueChange}
              onFormSubmit={this.addItem}
            >
              <Button disabled={isEnabled} type="submit">
                Submit
              </Button>
            </FoundItemForm>
          )}
        </div>
      </Positioner>
    );
  }
}
