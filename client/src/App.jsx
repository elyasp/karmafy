import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import UserView from "./views/UserView";
import FoundItemView from "./views/FoundItemView";
import ItemEditView from "./views/ItemEditView";
import ItemAddView from "./views/ItemAddView";
import ListView from "./views/ListView";
import Nav from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import RouteProtector from "./components/RouteProtector";
import { logOutService, verifyService } from "./services/authServices";

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
        this.props.history.push("/register");
        console.log("PROPS HISTORY CALLED FROM LOGOUT()", this.props.history);
      })
      .catch(error => {
        console.log(error);
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
      <Router>
        <Nav logOut={this.logOut} user={this.state.user} />
        <div className="container mt-3">
          {this.state.loaded && (
            <Switch>
              <Route path="/" exact component={HomeView} />
              <RouteProtector
                path="/login"
                verify={this.checkUnAuthed}
                render={props => (
                  <LoginView {...props} exact loadUser={this.loadUser} />
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
                render={props => <UserView {...props} user={this.state.user} />}
              />
              <Route path="/all" component={ListView} />

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
                  <FoundItemView {...props} user={this.state.user} />
                )}
              />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}
