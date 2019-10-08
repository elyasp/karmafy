import React, { Component } from "react";
import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

import { edit } from "../services/itemApi";
import { load } from "../services/itemApi";

export default class FoundItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  loadItem() {
    load(this.props.match.params.id)
      .then(item => {
        this.setState({
          item
        });
      })
      .catch(error => {
        this.props.history.push(
          `/error/${error.response ? error.response.status : "404"}`
        );
      });
  }

  componentDidMount() {
    this.loadItem();
  }

  // componentDidUpdate(previousProps, previousState) {
  //   if (
  //     !this.state.item ||
  //     previousProps.match.params.id !== this.props.match.params.id
  //   ) {
  //     this.loadItem();
  //   }
  // }
  render() {
    const item = this.state.item;
    const user = this.props.user;
    return (
      (item && (
        <Card
          className="mt-5 border-0 mx-auto text-center"
          style={{ width: "90%" }}
        >
          <Carousel className="mx-auto" style={{ width: "50%" }}>
            {item.imageUrl.map(item => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body className="px-0">
            <Card.Title className="mt-3" style={{ fontSize: "2.6rem" }}>
              {item.title}
            </Card.Title>
            <Card.Subtitle className="mt-3" style={{ fontSize: "1.5rem" }}>
              Location Found: Somewhere
            </Card.Subtitle>
            <Card.Text className="mt-3" style={{ fontSize: "1.25rem" }}>
              {item.description}
            </Card.Text>

            {user.id && item.user === user._id ? (
              <Link
                to={`/item/${item._id}/edit`}
                className="mx-3 btn btn-danger"
                variant="primary"
              >
                Edit
              </Link>
            ) : (
              <div>
                <Link className="mx-3 btn btn-danger" variant="primary">
                  Claim!
                </Link>
                <Link className="mx-3 btn btn-danger" variant="primary">
                  Mark as Resolved
                </Link>
              </div>
            )}
          </Card.Body>
        </Card>
      )) || <div></div>
    );
  }
}
