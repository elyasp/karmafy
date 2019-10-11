import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeView from "./HomeView";
import EditUserView from "./EditUserView";
import ItemCard from "../components/ItemCard";
import styled from "styled-components";
import { loadByUser } from "../services/itemApi";
import { remove } from "./../services/itemApi";
import { Card, Col, Row, Container, Carousel } from "react-bootstrap";
//////////////////// STYLE //////////////////////

const ViewWrapper = styled.div`
  padding: 3em;
  color: #fff;
  width: 100%;
  height: 76.5vh;
  line-height: 2em;
  text-shadow: 1px 1px 4px #2b3d3a;
  font-weight: 200;
`;

const ProfileWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  h1 {
    font-weight: 200;
    font-size: 2em;
  }

  h3 {
    font-weight: 200;
    font-size: 1em;
  }
  h6 {
    font-size: 2.5em;
  }
  span {
    letter-spacing: 0.4em;
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
  .editlink {
    text-decoration: none;
  }

  .editbutton {
    border-radius: 2px solid black;
    background: rgb(0, 199, 133);
  }

  .markbutton {
    border-radius: 2px solid black;
    background: rgb(0, 199, 133);
  }
`;

const ItemSection = styled.div`
  height: 150vh;
  margin-top: 6em;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: #070424;
  p {
    color: white;
  }
  h4 {
    color: white;
    letter-spacing: 0.35em;
    font-size: 0.7em;
    font-weight: 200;
    text-shadow: 5px 5px 13px #2b3d3a;
  }
`;

const Button = styled.button`
  border: 0.5px solid #ffffffb0;
  border-radius: 3px;
  display: flex;
  justify-self: center;
  font-size: 20px;
  margin: 0.5em;
  background: none;
  transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;

  &:hover {
    background: hsla(0, 0%, 98%, 0.514);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    color: black;
  }
  h5 {
    height: 1em;
    color: white;
    font-weight: 200;
    text-shadow: 1px 1px 6px #2c0401;
  }
`;

const FoundCardHeader = styled.div`
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h6 {
    margin-top: 0.5em;
    color: #5bf7a9;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
    font-size: 1em;
  }
`;

const LostCardHeader = styled.div`
  background: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h6 {
    font-size: 1em;
    margin-top: 0.5em;
    color: #ff3c00;
    font-family: "Courier New", Courier, monospace;
    letter-spacing: 0.3em;
  }
`;

//////////////////////// END OF STYLE ///////////////////////////

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

  itemUpdate(event) {
    let id = event.target.name;
    this.setState({
      itemId: id
    });
  }

  loadItem() {
    loadByUser(this.props.user._id)
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

    remove(id)
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
    const item = this.state;
    return (
      <div>
        {(this.props.user && this.state.item && (
          <div>
            <ViewWrapper>
              <ProfileWrapper>
                <img src={user.profile} width="200" />
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
                          <Card
                            className="text-center carditem"
                            style={{ width: "100%" }}
                          >
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
