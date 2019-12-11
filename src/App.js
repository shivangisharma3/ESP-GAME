import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login-user.component"
import Game from "./components/game-user.component"
function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/user" component={CreateUser} />
      <Route path="/login" component={Login} />
      <Route path="/game" component={Game} />
    </Router>
  );
}

export default App;
