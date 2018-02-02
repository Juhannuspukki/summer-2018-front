import React, { Component } from 'react';
import logo from './img/backtorealwork_dino_home.png';
import './App.css';
import DuckForm from "./DuckForm.js";
import DuckList from "./DuckList.js";
import Route from "react-router-dom/Route";


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Duck DB!</h1>
        </header>
          <Route
              path="/"
              exact
              component={DuckList}
          />
          <Route
              path="/add"
              exact
              component={DuckForm}
          />

      </div>
    );
  }
}

export default App;
