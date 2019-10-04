import React, { Component } from "react";
// import { Link } from "react-router-dom";

// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ItemForm from "./../components/ItemForm";

export default class ItemEditView extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Edit Item</h1>
        <ItemForm
        // value={this.state.item}
        // onValueChange={this.onFormValueChange}
        // onFormSubmit={this.addItem}
        >
          <Button type="submit">Edit Item</Button>
        </ItemForm>
      </div>
    );
  }
}
