import React, { Component } from "react";
import { list } from "./../services/itemApi";
import { Link } from "react-router-dom";
import { Card, Col, Row, Container, Carousel, Button } from "react-bootstrap";
import HomeMap from "./HomeMap";
import {
  Center,
  Map,
  CardWrapper,
  FoundCardHeader,
  LostCardHeader
} from "./styles/itemcard";

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      items: [],
      searchTerm: "",
      itemType: "",
      className: "filterBtn"
    };

    this.buttonFilter = this.buttonFilter.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  searchFilter(event) {
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    });
  }

  buttonFilter(event) {
    this.setState({
      itemType: event.target.value
    });
  }

  get filteredSearchList() {
    const query = this.state.searchTerm;
    const item = this.state.items;
    const type = this.state.itemType;

    if (!type) {
      return item.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type) {
      return item
        .filter(item => item.itemStatus === type)
        .filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
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
    console.log(this.state.itemType);
    return (
      (this.state.items && (
        <Container>
          <Center>
            <div className="searchfilter">
              <Button
                className="filterBtn"
                id={this.state.itemType === "Lost" ? "clicked" : ""}
                name="Lost"
                onClick={this.buttonFilter}
                value="Lost"
              >
                Lost
              </Button>
              <Button
                className="filterBtn"
                id={this.state.itemType === "Found" ? "clicked" : ""}
                name="Found"
                onClick={this.buttonFilter}
                value="Found"
              >
                Found
              </Button>
            </div>
          </Center>
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

          <Map>
            <HomeMap items={this.filteredSearchList} />
          </Map>

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
