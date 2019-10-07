import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FoundItemForm from "../components/FoundItemForm";
import LostItemForm from "../components/LostItemForm";
import { add } from "./../services/itemApi";
import { uploadImage } from "./../services/itemApi";

/////// IMPORT HERE THE ADD LOST N FOUND COMPONENTS<
/// SWITCH COMPONENT BASED ON LOST OR FOUND CHECKBOX, and therefore the form changes

export default class ItemAddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        user: "",
        title: "",
        description: "",
        itemStatus: "",
        imageUrl: ""
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
        user: this.props.user._id
      }
    });
  }

  addFound() {
    this.setState({
      item: {
        itemStatus: "Found",
        user: this.props.user._id
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
    const user = this.props.user;

    return (
      <div className="container">
        <h1 className="text-center ">Add Item</h1>

        {!this.state.item.itemStatus && (
          <div>
            <Button onClick={this.addLost} variant="light" size="lg">
              Add Lost Item
            </Button>
            <Button onClick={this.addFound} variant="light" size="lg">
              Add Found Item
            </Button>
          </div>
        )}

        {this.state.item.itemStatus === "Lost" && (
          <LostItemForm
            value={this.state.item}
            onValueChange={this.onFormValueChange}
            onFormSubmit={this.addItem}
          >
            <Button type="submit">Submit</Button>
          </LostItemForm>
        )}

        {this.state.item.itemStatus === "Found" && (
          <FoundItemForm
            value={this.state.item}
            onValueChange={this.onFormValueChange}
            onFormSubmit={this.addItem}
          >
            <Button type="submit">Submit</Button>
          </FoundItemForm>
        )}
      </div>
    );
  }
}
