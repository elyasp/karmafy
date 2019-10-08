import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MessageSent from "./MessageSentView";

import Carousel from "react-bootstrap/Carousel";
import { Card, Form } from "react-bootstrap";
import axios from "axios";

import { edit } from "../services/itemApi";
import { load } from "../services/itemApi";

import styled from "styled-components";

//////////////////////// STYLE ////////////////////////

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardWrapper = styled.div`
  color: black;
  max-width: 50vw;
`;

const MailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const Button = styled.button`
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  &:hover {
    color: black;
    background: hsla(59, 100%, 49%, 0.34);
  }
`;

//////////////////// END OF STYLE ////////////////////

export default class FoundItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      contactnumber: "",
      email: "",
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  async handleSubmit(e) {
    e.preventDefault();
    const { contactnumber, email, message } = this.state;
    const receiver = this.state.item && this.state.item.user.email;

    const name = this.props.user.name;
    const form = await axios.post("/mailsent", {
      name,
      email,
      message,
      receiver,
      contactnumber
    });
  }

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const item = this.state.item && this.state.item;
    const user = this.props.user;
    console.log("ITEM USER EMAIL", item);

    return (
      (item && (
        <PageWrapper className="container">
          <CardWrapper>
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

                {user && item.user === user._id ? (
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
          </CardWrapper>

          <MailWrapper>
            <h2>Item yours? Contact the finder</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="email">Your Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="contactnumber">
                  Add your phone number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="contactnumber"
                  placeholder="optional"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="message">Message</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  as="textarea"
                  required
                  name="message"
                  rows="8"
                  placeholder="Be sure to include as much details as you can remember (tip: offer a reward ;)"
                />
              </Form.Group>
              <Button type="submit">send</Button>
            </Form>
          </MailWrapper>
        </PageWrapper>
      )) || (
        <div>
          <h3> No Item to View..</h3>
        </div>
      )
    );
  }
}
