import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
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
    console.log("state", this.state.item);
    const item = this.state.item;
    add(item)
      .then(item => {
        console.log("Did it");
        this.props.history.push(`/item/${item._id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
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

{
  /* <Form method="POST" action="/item/add">
          <Form.Group>
            <div class="form-check form-check-inline" name="itemStatus">
              <Form.Check
                class="form-check-input"
                type="radio"
                name="itemStatus"
                id="inlineRadio1"
                value="Lost"
              />
              Lost Item
            </div>
            <div class="form-check form-check-inline">
              <Form.Check
                class="form-check-input"
                type="radio"
                name="itemStatus"
                id="inlineRadio2"
                value="Found"
              />
              Found Item
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Post Title" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              name="description"
              placeholder="Add a detailed description"
              size="lg"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Upload Your Images</Form.Label>
            <Form.Control
              as="input"
              type="file"
              name="file"
              size="lg"
              className="btn-lg pl-0"
              // value={this.props.value.images}
            />
          </Form.Group>
          <Button type="submit">Create Item</Button>
        </Form> */
}
