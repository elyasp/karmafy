import React, { Component, Fragment } from "react";
import { list } from "./../services/itemApi";
import { Link } from "react-router-dom";
import { Card, Col, Row, Container, Carousel } from "react-bootstrap";
import styled from "styled-components";
import { loadByType } from "../services/itemApi";
import HomeMap from "./HomeMap";
//////////////////////////////////////// STYLE //////////////////////////////////////

const Map = styled.div`
  height: 500px;
  max-width: 90vh;
  margin-left: 8%;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2vh;

  .searchfilter {
    display: flex;
  }
`;

const CardWrapper = styled.div`
  margin-top: 2.5em;
  margin-bottom: 2em;

  .carditem {
    min-height: 20em;
    border: none;
    background: hsl(0, 0%, 100%);
    transition: 0.4s;
    cursor: pointer;
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      10px 10px 30px 15px rgba(0, 0, 0, 0.22);

    &:hover {
      transform: scale(1.05, 1.05);
      transition: 0.4s;
      box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
        10px 10px 30px 15px rgba(0, 0, 0, 0.22);
    }
  }

  .cardtitle {
    font-size: 20px;
    color: black;
  }

  .cardsubtitle {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: rgba(3, 0, 0, 0.808);
    margin-left: 1em;
  }
`;

const Button = styled.div`
  border: 0.5px solid #ffffffb0;
  border-radius: 2px;
  display: flex;
  justify-self: center;
  font-size: 16px;
  margin: 1em;
  color: black;
  padding-right: 3em;
  padding-left: 3em;

  background: white;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;

  height: 1.7em;
  &:hover {
    background: hsla(0, 0%, 98%, 0.514);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    color: black;
  }
`;

const FoundCardHeader = styled.div`
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h4 {
    margin-top: 0.2em;
    color: #5bf7a9;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;

const LostCardHeader = styled.div`
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h4 {
    margin-top: 0.2em;
    color: #ff3c00;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;

//////////////////////////////////////////////// END OF STYLE //////////////////////////////////////////////

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      items: [],
      searchTerm: "",
      lostButton: "",
      foundButton: ""
    };

    this.lost = this.lost.bind(this);
    this.found = this.found.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  lost() {
    if (this.state.lostButton === "clicked") {
      this.setState({
        lostButton: "",
        searchTerm: ""
      });
    } else {
      this.setState({
        lostButton: "clicked",
        foundButton: "",
        searchTerm: "Lost"
      });
    }
  }

  found() {
    if (this.state.foundButton === "clicked") {
      this.setState({
        foundButton: "",
        searchTerm: ""
      });
    } else {
      this.setState({
        foundButton: "clicked",
        lostButton: "",
        searchTerm: "Found"
      });
    }
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
      this.state.foundButton === "clicked"
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
        let locations = items.map(place => {
          return place.location;
        });
        this.setState({
          items,
          locations: locations
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      (this.state.items && (
        <Container>
          <Center>
            <div className="searchfilter">
              <Button name="Lost" onClick={this.lost} value="Lost">
                Lost
              </Button>
              <Button name="Found" onClick={this.found} value="Found">
                Found
              </Button>
            </div>
          </Center>

          <Map>
            <HomeMap items={this.filteredSearchList} />
          </Map>
          <Center>
            <div>
              <input
                onChange={this.searchFilter}
                type="text"
                className="searchbar"
                placeholder="type to search map and items"
              ></input>
            </div>
          </Center>

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
                      id={item._id}
                    >
                      {item.itemStatus === "Found" ? (
                        <FoundCardHeader>
                          <h4>᛫ FOUND ᛫</h4>
                        </FoundCardHeader>
                      ) : (
                        <LostCardHeader>
                          <h4>᛫ LOST ᛫</h4>
                        </LostCardHeader>
                      )}

                      <Carousel className="mx-auto" style={{ width: "100%" }}>
                        {item.imageUrl.map(item => (
                          <Carousel.Item className="carouselimage">
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
                      <Card.Subtitle className="mt-2 cardsubtitle">
                        {item.user.name}
                      </Card.Subtitle>
                      <Card.Body className="px-0">
                        <Card.Title className="mt-1 cardtitle">
                          {item.title}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </CardWrapper>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      )) || (
        <div>
          <h3> Item Loading...</h3>
        </div>
      )
    );
  }
}
