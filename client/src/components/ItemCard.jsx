import React, { Component } from "react";
import { list } from "./../services/itemApi";
import { Link } from "react-router-dom";
import { Card, Col, Row, Container, Carousel } from "react-bootstrap";
import styled from "styled-components";

const CardWrapper = styled.div`
  .carditem {
    border-radius: 20px;
    border: none;
    background: hsla(0, 96%, 52%, 0.4);
    height: 400px;
    margin: 10px;
  }

  .cardtitle {
    font-size: 20px;
    color: black;
  }

  .cardsubtitle {
    font-size: 15px;
    color: black;
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
                    <Carousel className="mx-auto" style={{ width: "100%" }}>
                      {item.imageUrl.map(item => (
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={item.image
                              .split("upload/")
                              .join("upload/h_350,w_500,c_scale/")}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <Card.Body className="px-0">
                      <Card.Title className="mt-1 cardtitle">
                        {item.title}
                      </Card.Title>
                      <Card.Subtitle className="mt-2 cardsubtitle">
                        Posted By: {item.postedBy}
                      </Card.Subtitle>
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
