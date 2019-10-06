import React, { Component } from "react";

import Button from "react-bootstrap/Button";

import FoundItemForm from "../components/FoundItemForm";
import { add } from "./../services/itemApi";
import { uploadImage } from "./../services/itemApi";

/////// IMPORT HERE THE ADD LOST N FOUND COMPONENTS<
/// SWITCH COMPONENT BASED ON LOST OR FOUND CHECKBOX, and therefore the form changes

export default class ItemAddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        user: this.props.user._id,
        title: "",
        description: "",
        itemStatus: "",
        imageUrl: ""
      }
    };
    this.onFormValueChange = this.onFormValueChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  onFormValueChange(data) {
    console.log("this is item", data);
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

  render() {
    const user = this.props.user;

    return (
      <div className="container">
        <h1 className="text-center">Add Item</h1>
        <FoundItemForm
          value={this.state.item}
          onValueChange={this.onFormValueChange}
          onFormSubmit={this.addItem}
        >
          <Button type="submit">Add Item</Button>
        </FoundItemForm>
      </div>
    );
  }
}
