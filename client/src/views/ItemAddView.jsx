import React, { Component } from "react";

import Button from "react-bootstrap/Button";

import ItemForm from "./../components/ItemForm";
import { add } from "./../services/itemApi";

export default class ItemAddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        title: "",
        description: "",
        itemStatus: ""
      }
    };
    this.onFormValueChange = this.onFormValueChange.bind(this);
    this.addItem = this.addItem.bind(this);
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

  render() {
    // console.log(req.body.user);
    return (
      <div className="container">
        <h1 className="text-center">Add Item</h1>
        <ItemForm
          value={this.state.item}
          onValueChange={this.onFormValueChange}
          onFormSubmit={this.addItem}
        >
          <Button type="submit">Add Item</Button>
        </ItemForm>
      </div>
    );
  }
}
