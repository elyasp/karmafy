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
      items: [],
      searchTerm: "",
      lostButton: ""
    };
    this.all = this.all.bind(this);
    this.lost = this.lost.bind(this);
    this.found = this.found.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  // found(event) {
  //   loadByType(event.target.value)
  //     .then(items => {
  //       this.setState({
  //         items
  //       });
  //     })
  //     .catch(error => {
  //       this.props.history.push(
  //         `/error/${error.response ? error.response.status : "404"}`
  //       );
  //     });
  // }

  lost() {
    if (this.state.lostButton === "clicked") {
      this.setState({
        lostButton: "",
        searchTerm: ""
      });
    } else {
      this.setState({
        lostButton: "clicked",
        searchTerm: "Lost"
      });
    }
  }

  found() {
    if (this.state.lostButton === "clicked") {
      this.setState({
        lostButton: "",
        searchTerm: ""
      });
    } else {
      this.setState({
        lostButton: "clicked",
        searchTerm: "Found"
      });
    }
  }

  all() {
    this.setState({
      lostButton: "",
      foundButton: "",
      searchTerm: ""
    });
  }

  searchFilter(event) {
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    });
  }

  get filteredSearchList() {
    const query = this.state.searchTerm;
    const item = this.state.items;
    if (
      this.state.lostButton === "clicked" ||
      this.state.founcButton === "clicked"
    ) {
      return item.filter(item => item.itemStatus === query);
    } else {
      return item.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }
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
        <Button name="Lost" onClick={this.lost} value="Lost">
          Lost Items
        </Button>
        <Button name="Found" onClick={this.found} value="Found">
          Found Items
        </Button>
        <Button name="All" onClick={this.all} value="All">
          All
        </Button>
        <input onChange={this.searchFilter} type="text"></input>
        <Row>
          {this.filteredSearchList.map(item => (
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
                      <h3>{item.itemStatus}</h3>
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
