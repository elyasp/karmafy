import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import HomeView from "./HomeView";
import EditUserView from "./EditUserView";
import ItemCard from "../components/ItemCard";
import styled from "styled-components";
import { loadByUser } from "../services/itemApi";
import { remove } from "./../services/itemApi";
import { Card, Col, Row, Container, Carousel } from "react-bootstrap";
//////////////////// STYLE //////////////////////

const ViewWrapper = styled.div`
  color: #fff;
  width: 100%;
  height: 76.5vh;
  background: hsla(49, 100%, 50%, 0.6);
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-weight: 200;
  }
`;

const ItemSection = styled.div`
  height: 150vh;
  margin-top: 10px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: #070424;
`;

//////////////////////// END OF STYLE ///////////////////////////

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      itemId: "",
      karmaCount: parseInt(this.props.user.karmaCount)
    };
    this.itemUpdate = this.itemUpdate.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.loadItem = this.loadItem.bind(this);
  }

  itemUpdate(event) {
    let id = event.target.name;
    this.setState({
      itemId: id
    });
  }

  loadByUser() {
    this.props.user._id
      .then(item => {
        console.log("new", item);
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
    let karmaNum = parseInt(this.props.user.karmaCount);
    if (clickedObj[0].itemStatus === "Found") {
      karmaNum += 1;
    }

    let data = {
      itemId: id,
      userId: this.props.user._id,
      karmaNum: karmaNum
    };

    this.setState({
      karmaCount: karmaNum
    });
    remove(data)
      .then(item => {
        this.loadItem();
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.loadItem();
  }

  render() {
    const user = this.props.user;
    const item = this.state;
    return (
      <div>
        {(this.props.user && this.state.item && (
          <div>
            <ViewWrapper>
              <ProfileWrapper>
                <img src={user.profile} width="200" />
                <h1>{this.props.user.name}</h1>
                <h1>{this.props.user.email}</h1>
                <h6>Karmalevel: {this.state.karmaCount}</h6>
                <Link to={`${this.props.user._id}/edit`}>
                  <Button>
                    <h5>Edit Profile</h5>
                  </Button>
                </Link>
              </ProfileWrapper>
              <ItemSection>
                <h4 className="text-white">My various items...</h4>
                <Container>
                  <Row>
                    {this.state.item.map(item => (
                      <Col md={4}>
                        <Card
                          className="text-center carditem"
                          style={{ width: "100%" }}
                        >
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
                              <h3>It's been reunited!</h3>
                            ) : (
                              <div>
                                <h3>{item.itemStatus}</h3>
                                <Link
                                  to={`/item/${item._id}/edit`}
                                  className="mx-3 btn btn-danger"
                                  variant="primary"
                                >
                                  Edit
                                </Link>
                                {/* <Form onSubmit={this.deleteItem}> */}
                                <Button
                                  className="mt-4 mx-3 btn btn-danger"
                                  type="submit"
                                  value={item._id}
                                  name={item._id}
                                  onClick={this.deleteItem}
                                >
                                  Mark As Resolved
                                </Button>
                                {/* </Form> */}
                              </div>
                            )}
                          </Card.Body>
                        </Card>
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
