import React, { Component } from "react";
import { Button } from "./styles/itemaddview";
import FoundItemForm from "./../components/FoundItemForm";
import LostItemForm from "./../components/LostItemForm";
import { edit, load } from "./../services/itemApi";

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

  editItem(event) {
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

  render() {
    return (
      <div class="container">
        {this.state.item.itemStatus === "Found" && (
          <FoundItemForm
            value={this.state.item}
            onValueChange={this.onFormValueChange}
            onFormSubmit={this.editItem}
          >
            <Button type="submit">Submit</Button>
          </FoundItemForm>
        )}
        {this.state.item.itemStatus === "Lost" && (
          <LostItemForm
            value={this.state.item}
            onValueChange={this.onFormValueChange}
            onFormSubmit={this.editItem}
          >
            <Button type="submit">Submit</Button>
          </LostItemForm>
        )}
      </div>
    );
  }
}
