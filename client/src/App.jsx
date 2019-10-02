import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import RegisterView from "./views/RegisterView";
import UserView from "./views/UserView";
import ItemView from "./views/ItemView";
import ItemEditView from "./views/ItemEditView";
import ItemAddView from "./views/ItemAddView";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/login" exact component={LoginView} />
        <Route path="/logout" exact component={LogoutView} />
        <Route path="/register" exact component={RegisterView} />
        <Route path="/user" exact component={UserView} />
        <Route path="/item/add" component={ItemAddView} />
        <Route path="/item/:id" exact component={ItemView} />
        <Route path="/item/:id/edit" exact component={ItemEditView} />
      </Switch>
    </Router>
  );
}

export default App;
