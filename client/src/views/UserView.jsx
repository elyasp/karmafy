import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HomeView from "./HomeView";
import EditUserView from "./EditUserView";
import ItemCard from "../components/ItemCard";
import styled from "styled-components";
import { loadByUser } from "../services/itemApi";
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
  margin-bottom: 100px;
  h1 {
    font-weight: 200;
  }
`;

const Button = styled.button`
  margin: 10px;
  color: white;
  border-radius: 5px;
  border: 2px solid white;
  background: none;
  &:hover {
    color: black;
    background: white;
  }
`;

const ItemSection = styled.div`
  height: 150vh;
  margin-top: 30px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: #070424;
`;

////////////////////////////////////////////////////

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
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

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const user = this.props.user;

    return (
      <div>
        {(this.props.user && this.state.item && (
          <div>
            <ViewWrapper>
              <Link to={`${this.props.user._id}/edit`}>
                {/* <Button>
                  <h5>Edit Profile</h5>
                </Button> */}
              </Link>
              <ProfileWrapper>
                <img src={user.profile} width="200" />
                <h1>{this.props.user.name}</h1>
                <h6>Karmalevel: 0</h6>
              </ProfileWrapper>
              <ItemSection>
                <h4>My various items...</h4>
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
                            <Card.Subtitle className="mt-2 cardsubtitle">
                              Location Found: Somewhere
                            </Card.Subtitle>
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
