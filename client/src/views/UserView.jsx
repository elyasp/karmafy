import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeView from "./HomeView";
import { loadByUser, remove } from "../services/itemApi";
import { Card, Col, Row, Container, Carousel } from "react-bootstrap";
import {
  ViewWrapper,
  ProfileWrapper,
  Button,
  ItemSection,
  CardWrapper,
  FoundCardHeader,
  LostCardHeader
} from "./styles/userview";

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      itemId: ""
    };
    this.itemUpdate = this.itemUpdate.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.loadItem = this.loadItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.user !== prevProps.user) {
      this.fetchData(this.props.user);
    }
    this.loadItem();
  }

  itemUpdate(event) {
    let id = event.target.name;
    this.setState({
      itemId: id
    });
  }

  loadItem() {
    loadByUser(this.props.user._id)
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
    let id = event.target.name;
    let clickedObj = this.state.item.filter(item => {
      return item._id === id;
    });

    let karmaNum = this.props.user.karmaCount;

    if (clickedObj[0].itemStatus === "Found") {
      karmaNum += 1;
    }

    let data = {
      itemId: id,
      userId: this.props.user._id,
      karmaNum: karmaNum
    };

    remove(data)
      .then(item => {
        this.loadItem();
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (this.props.user) {
      this.loadItem();
    }
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        {(this.props.user && this.state.item && (
          <div>
            <ViewWrapper>
              <ProfileWrapper>
                <img src={user.profile} width="200" alt="you" />
                <br></br>
                <h1>{this.props.user.name}</h1>
                <span>
                  KARMA LEVEL:
                  <h6> {this.props.user.karmaCount}</h6>
                </span>
                <br />

                <h3>{this.props.user.email}</h3>
                <Link to={`${this.props.user._id}/edit`} className="editlink">
                  <Button className="editbutton">
                    <h5>Edit Profile</h5>
                  </Button>
                </Link>
              </ProfileWrapper>
            </ViewWrapper>
            <ViewWrapper>
              <ItemSection>
                <br />
                <h4>⚞ YOUR POSTED ITEMS ⚟</h4>
                <br />

                <Container>
                  <Row>
                    {this.state.item.map(item => (
                      <Col md={4}>
                        <CardWrapper>
                          <Card className="text-center carditem">
                            {item.resolved === false ? (
                              <FoundCardHeader>
                                <h6>᛫ ᛫ PENDING ᛫ ᛫</h6>
                              </FoundCardHeader>
                            ) : (
                              <LostCardHeader>
                                <h6>᛫ REUNITED ᛫</h6>
                              </LostCardHeader>
                            )}
                            <Carousel
                              className="mx-auto"
                              style={{ width: "100%" }}
                            >
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
                              {item.resolved ? (
                                <h3>Item Reunited!</h3>
                              ) : (
                                <div className="d-flex">
                                  <Link
                                    to={`/item/${item._id}/edit`}
                                    className="mx-3 editlink"
                                  >
                                    <Button className="editbutton">
                                      Edit Item
                                    </Button>
                                  </Link>

                                  <Button
                                    className="markbutton"
                                    type="submit"
                                    value={item._id}
                                    name={item._id}
                                    onClick={this.deleteItem}
                                  >
                                    Mark As Resolved
                                  </Button>
                                </div>
                              )}
                            </Card.Body>
                          </Card>
                        </CardWrapper>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </ItemSection>
            </ViewWrapper>
          </div>
        )) || <HomeView />}
      </div>
    );
  }
}
