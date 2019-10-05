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
import Navbar from "react-bootstrap/Navbar";
import { logOutService } from "./services/authServices";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    logOutService()
      .then(() => {
        this.setState({
          user: null
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Router>
        {/* <Nav logOut={this.logOut} user={this.state.user} /> */}
        <Nav />
        <div className="container mt-3">
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/login" exact component={LoginView} />
            <Route path="/register" exact component={RegisterView} />
            <Route path="/user" exact component={UserView} />
            <Route path="/all" component={ListView} />
            <Route path="/item/add" component={ItemAddView} />
            <Route path="/item/:id/edit" component={ItemEditView} />
            <Route path="/item/:id" component={FoundItemView} />
          </Switch>
        </div>
      </Router>
    );
  }
}
