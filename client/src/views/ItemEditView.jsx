import React, { Component } from "react";
// import { Link } from "react-router-dom";

// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FoundItemForm from "./../components/FoundItemForm";
import LostItemForm from "./../components/LostItemForm";

import { remove } from "./../services/itemApi";
import { edit } from "./../services/itemApi";
import { load } from "./../services/itemApi";

export default class ItemEditView extends Component {
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
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    load(id)
      .then(item => {
        this.setState({
          item: {
            ...item
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onFormValueChange(data) {
    this.setState({
      item: {
        ...this.state.item,
        ...data
      }
    });
  }

  editItem() {
    const id = this.props.match.params.id;

    const item = this.state.item;
    edit(id, item)
      .then(item => {
        this.props.history.push(`/item/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItem() {
    const id = this.props.match.params.id;
    console.log("this is delete id", id);
    remove(id)
      .then(item => {
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="container">
        {this.state.item.itemStatus === "Found" && (
          <FoundItemForm
            value={this.state.item}
            onValueChange={this.onFormValueChange}
            onFormSubmit={this.addItem}
          >
            <Button type="submit">Submit</Button>
          </FoundItemForm>
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
      </div>
    );
  }
}
