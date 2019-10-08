import React, { Component } from "react";
import { list } from "./../services/itemApi";
import { Link } from "react-router-dom";
import { Card, Col, Row, Container, Carousel, Button } from "react-bootstrap";
import styled from "styled-components";
import { loadByType } from "../services/itemApi";
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
    this.lost = this.lost.bind(this);
    this.found = this.found.bind(this);
  }

  lost(event) {
    loadByType(event.target.name)
      .then(items => {
        console.log("lost list", items);
        this.setState({
          items
        });
      })
      .catch(error => {
        // this.props.history.push(
        //   `/error/${error.response ? error.response.status : "404"}`
        // );
      });
  }

  found(event) {
    console.log(event.target.name);
    loadByType(event.target.name)
      .then(items => {
        console.log("found list", items);
        this.setState({
          items
        });
      })
      .catch(error => {
        // this.props.history.push(
        //   `/error/${error.response ? error.response.status : "404"}`
        // );
      });
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
    console.log("state", this.state.items);
    return (
      <Container>
        <Button name="Lost" onClick={this.lost}>
          Lost Items
        </Button>
        <Button name="Found" onClick={this.found}>
          Found Items
        </Button>
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
