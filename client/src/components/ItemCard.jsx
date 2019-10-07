import React, { Component } from "react";
import { list } from "./../services/itemApi";
import { Link } from "react-router-dom";
import { Card, Col, Row, Container, Carousel } from "react-bootstrap";
import styled from "styled-components";

const CardWrapper = styled.div`
  .carditem {
    border-radius: 20px;
    border: none;
    background: #d3cfff;
  }
`;

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    list()
      .then(items => {
        this.setState({
          items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.items.map(item => (
            <Col md={4}>
              <Link
                to={`/item/${item._id}`}
                key={item._id}
                style={{ textDecoration: "none" }}
              >
                <CardWrapper>
                  <Card
                    className="text-center carditem"
                    style={{ width: "100%" }}
                  >
                    <Carousel className="mx-auto mt-3" style={{ width: "90%" }}>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://source.unsplash.com/1600x900/?key"
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://source.unsplash.com/1600x900/?key"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://source.unsplash.com/1600x900/?key"
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>

                    <Card.Body className="px-0">
                      <Card.Title
                        className="mt-3"
                        style={{ fontSize: "2.6rem" }}
                      >
                        {item.title}
                      </Card.Title>
                      <Card.Subtitle
                        className="mt-3"
                        style={{ fontSize: "1.5rem" }}
                      >
                        Location Found: Somewhere
                      </Card.Subtitle>
                      <Card.Text
                        className="mt-3"
                        style={{ fontSize: "1.25rem" }}
                      >
                        {item.description}
                      </Card.Text>
                      {/* <Link className="mx-3 btn btn-danger" variant="primary">
                      Claim!
                    </Link> */}
                      {/* <div>
                      <Link
                        to={`/item/${item._id}/edit`}
                        className="mx-3 btn btn-danger"
                        variant="primary"
                      >
                        Edit
                      </Link>
                      <Link className="mx-3 btn btn-danger" variant="primary">
                        Mark as Resolved
                      </Link>
                    </div> */}
                    </Card.Body>
                  </Card>
                </CardWrapper>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
