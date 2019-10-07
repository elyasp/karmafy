import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import UserView from "./views/UserView";
import EditUserView from "./views/EditUserView";
import ItemView from "./views/ItemView";
import ItemEditView from "./views/ItemEditView";
import ItemAddView from "./views/ItemAddView";
import ItemCard from "./components/ItemCard";
import Nav from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import RouteProtector from "./components/RouteProtector";
import { logOutService, verifyService } from "./services/authServices";

///////////////////////// STYLE //////////////////////////

const change = keyframes`
 0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
`;

const UniStyle = styled.div`
  color: #fff;
  height: 200vh;
  color: white;
  background: linear-gradient(
    45deg,
    #1fffbc,
    #a219fd,
    #1d99ff,
    #a219fd,
    #1fffbc
  );
  background-size: 400% 400%;
  position: relative;
  animation: ${change} 35s linear infinite;
`;

/////////////////// END OF STYLE   /////////////////////

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
    };
    this.loadUser = this.loadUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.checkAuthed = this.checkAuthed.bind(this);
    this.checkUnAuthed = this.checkUnAuthed.bind(this);
  }

  componentDidMount() {
    verifyService()
      .then(user => {
        if (user) {
          this.setState({
            ...(user && { user }),
            loaded: true
          });
          console.log("user verified", this.state.user);
        } else {
          this.setState({
            loaded: true
          });
        }
      })
      .catch(error => {
        console.log("user not verified through verifyService====>", error);
      });
  }

  loadUser(user) {
    this.setState({
      user
    });
  }

  logOut() {
    logOutService()
      .then(() => {
        this.setState({
          user: null
        });
        this.props.history.push("/");
        console.log("PROPS HISTORY CALLED FROM LOGOUT()", this.props.history);
      })
      .catch(error => {
        console.log("LOGOUT FALED", error);
      });
  }

  checkAuthed() {
    return this.state.user;
  }

  checkUnAuthed() {
    return !this.state.user;
  }

  render() {
    return (
      <UniStyle>
        <Router>
          <Nav logOut={this.logOut} user={this.state.user} />
          <div>
            {this.state.loaded && (
              <Switch>
                <Route path="/" exact component={HomeView} />
                <RouteProtector
                  path="/login"
                  verify={this.checkUnAuthed}
                  render={props => (
                    <LoginView
                      {...props}
                      exact
                      loadUser={this.loadUser}
                      user={this.state.user}
                    />
                  )}
                />
                <RouteProtector
                  path="/register"
                  verify={this.checkUnAuthed}
                  render={props => (
                    <RegisterView {...props} exact loadUser={this.loadUser} />
                  )}
                />
                <Route
                  path="/user/:name"
                  exact
                  render={props => (
                    <UserView {...props} user={this.state.user} />
                  )}
                />
                <RouteProtector
                  path="/user/:name/edit"
                  exact
                  verify={this.checkAuthed}
                  render={props => (
                    <EditUserView {...props} user={this.state.user} />
                  )}
                />
                <Route path="/all" component={ItemCard} />

                <RouteProtector
                  path="/item/add"
                  verify={this.checkAuthed}
                  exact
                  render={props => (
                    <ItemAddView {...props} user={this.state.user} />
                  )}
                />
                <RouteProtector
                  path="/item/:id/edit"
                  verify={this.checkAuthed}
                  exact
                  render={props => <ItemEditView {...props} />}
                />
                <Route
                  path="/item/:id"
                  exact
                  render={props => (
                    <ItemView {...props} user={this.state.user} />
                  )}
                />
              </Switch>
            )}
          </div>
        </Router>
      </UniStyle>
    );
  }
}
