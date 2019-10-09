import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MessageSent from "./MessageSentView";

import Carousel from "react-bootstrap/Carousel";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { remove } from "./../services/itemApi";
import { edit } from "../services/itemApi";
import { load } from "../services/itemApi";
import Map from "../components/ItemMap";
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
      message: "",
      ownerCheckAns: "",
      sent: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  deleteItem(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    remove(id)
      .then(item => {
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { contactnumber, email, message, ownerCheckAns } = this.state;
    const receiver = this.state.item && this.state.item.user.email;
    const verifQuestion = this.state.item && this.state.item.ownerCheck;
    const name = this.props.user.name;
    const form = await axios
      .post("/mailsent", {
        name,
        email,
        message,
        receiver,
        contactnumber,
        ownerCheckAns,
        verifQuestion
      })
      .then(() => {
        this.setState({
          sent: true
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const containerStyle = { height: "200px" };
    const item = this.state.item && this.state.item;
    const user = this.props.user;
    console.log("USER ", user, "ITEM ", item);
    return (
      (item && (
        <PageWrapper className="container">
          {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          <CardWrapper>
            <Card
              className="mt-5 border-0 mx-auto text-center"
              style={{ width: "90%" }}
            >
              <Carousel className="mx-auto" style={{ width: "50%" }}>
                {item.imageUrl.map(item => (
                  <Carousel.Item key={item._id}>
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
                <Map item={item.location} />
                {user && item && item.user._id === user._id ? (
                  <div>
                    <Link
                      to={`/item/${item._id}/edit`}
                      className="mx-3 btn btn-danger"
                      variant="primary"
                    >
                      Edit
                    </Link>
                    <Form onSubmit={this.deleteItem}>
                      <Button
                        className="mt-4 mx-3 btn btn-danger"
                        type="submit"
                      >
                        Mark As Resolved
                      </Button>
                    </Form>
                  </div>
                ) : (
                  <Link
                    to="#"
                    className="mx-3 btn btn-danger"
                    variant="primary"
                  >
                    Claim!
                  </Link>
                )}
              </Card.Body>
            </Card>
          </CardWrapper>

          {!this.state.sent ? (
            <MailWrapper>
              {this.state.item.itemStatus === "Found" ? (
                <Fragment>
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
                      <Form.Text>
                        <small>You will be replied to this address</small>
                      </Form.Text>
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
                      <Form.Label htmlFor="ownerCheck">
                        {this.state.item.ownerCheck}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        name="ownerCheckAns"
                        placeholder="verification question"
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor="message">Message</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        as="textarea"
                        name="message"
                        rows="6"
                        placeholder="Be sure to include as much details as you can remember (tip: offer a reward ;)"
                      />
                    </Form.Group>
                    <Button type="submit">Send Message</Button>
                  </Form>
                </Fragment>
              ) : (
                <Fragment>
                  <h2>Found this? Upgrade your karma and return it!</h2>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label htmlFor="email">Your Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        onChange={this.handleChange}
                      />
                      <Form.Text>
                        <small>You will be replied to this address</small>
                      </Form.Text>
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
                        name="message"
                        rows="3"
                      />
                    </Form.Group>
                    <Button type="submit">Send Message</Button>
                  </Form>
                </Fragment>
              )}
            </MailWrapper>
          ) : (
            <MessageSent />
          )}
        </PageWrapper>
      )) || (
        <div>
          <h3> Item Loading...</h3>
        </div>
      )
    );
  }
}
